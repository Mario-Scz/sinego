# Guía de Despliegue (Deployment)

Esta guía te ayuda a desplegar Sinego en un servidor de producción.

## Requisitos

- PHP 7.4+ (recomendado 8.1+)
- MySQL 5.7+ o MariaDB 10.5+
- Servidor Web (Apache con mod_rewrite o Nginx)
- Acceso SSH o SFTP al servidor
- Certificado SSL/TLS (MUY RECOMENDADO)

## Pasos de Despliegue

### 1. Subir archivos al servidor

Usa SFTP o Git para subir el proyecto a la carpeta pública del servidor (ej: `public_html`, `www`, etc.).

```bash
# Si usas Git
git clone https://tu-repo.git /var/www/sinego
cd /var/www/sinego
```

O con SFTP (desde tu máquina local):
```bash
sftp usuario@servidor.com
put -r ./sinego /public_html/
```

### 2. Configurar permisos de directorios

```bash
cd /var/www/sinego
chmod 755 .
chmod 755 config/
chmod 755 api/
chmod 755 vistas/
chmod 755 scripts/
chmod -R 755 img/
chmod -R 755 css/
chmod -R 755 js/

# Crear directorio logs con permisos de escritura
mkdir -p logs/
chmod 755 logs/

# Permisos de lectura para archivos
find . -type f -exec chmod 644 {} \;
```

### 3. Configurar variables de entorno

Copia y edita `.env`:

```bash
cp .env.example .env
nano .env
```

Edita con valores reales:
```
DB_HOST=localhost
DB_USER=sinego_prod
DB_PASS=TuContraseñaFuerte123!
DB_NAME=sinego_prod

SESSION_SECURE=true
SESSION_HTTPONLY=true
APP_DEBUG=false
```

### 4. Crear base de datos

Accede a MySQL/MariaDB y crea la base de datos:

```bash
mysql -u root -p

CREATE DATABASE sinego_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'sinego_prod'@'localhost' IDENTIFIED BY 'TuContraseñaFuerte123!';
GRANT ALL PRIVILEGES ON sinego_prod.* TO 'sinego_prod'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 5. Crear tablas y usuario admin

Desde el servidor:

```bash
cd /var/www/sinego
mysql -u sinego_prod -p sinego_prod < config/schema.sql
php scripts/create_admin.php admin StrongAdminPassword "Administrador" admin@tudominio.com
```

### 6. Configurar servidor web

#### Apache (si usas Apache)

Asegúrate que `mod_rewrite` está habilitado:

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

El archivo `.htaccess` incluido ya contiene configuraciones básicas. Ajusta si es necesario.

#### Nginx (si usas Nginx)

Crea una configuración de servidor virtual:

```nginx
server {
    listen 443 ssl http2;
    server_name tudominio.com;

    root /var/www/sinego;
    index index.html index.php;

    # SSL (recomendado)
    ssl_certificate /etc/ssl/certs/tudominio.crt;
    ssl_certificate_key /etc/ssl/private/tudominio.key;

    # Seguridad HTTP
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Redirigir HTTP a HTTPS
    if ($scheme != "https") {
        return 301 https://$server_name$request_uri;
    }

    # Pasar PHP a php-fpm
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }

    # Bloquear acceso a archivos sensibles
    location ~ /\. {
        deny all;
    }
}
```

### 7. Configurar HTTPS

MUY IMPORTANTE: Obtén un certificado SSL gratuito con **Let's Encrypt**:

```bash
sudo apt install certbot python3-certbot-apache
sudo certbot certonly --apache -d tudominio.com
```

Luego configura auto-renovación:

```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 8. Configurar PHP

Edita `/etc/php/8.1/fpm/php.ini` (o tu versión) con configuraciones seguras:

```ini
display_errors = Off
log_errors = On
error_log = /var/log/php/sinego.log
session.cookie_secure = On
session.cookie_httponly = On
session.cookie_samesite = "Lax"
upload_max_filesize = 10M
post_max_size = 10M
```

### 9. Configurar logs

Crea un directorio para logs PHP:

```bash
mkdir -p /var/log/php
chmod 755 /var/log/php
chown www-data /var/log/php
```

### 10. Realizar backup

Crea un script de backup periódico:

```bash
cat > /usr/local/bin/backup-sinego.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/backups/sinego
mkdir -p $BACKUP_DIR

# Backup base de datos
mysqldump -u sinego_prod -p"$DB_PASS" sinego_prod > $BACKUP_DIR/db_$DATE.sql

# Backup archivos (omitir logs y cache)
tar --exclude='logs' --exclude='cache' -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/sinego

# Limpiar backups viejos (más de 30 días)
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completado: $DATE"
EOF

chmod +x /usr/local/bin/backup-sinego.sh
```

Agrega a crontab para ejecutarse diariamente:

```bash
0 2 * * * /usr/local/bin/backup-sinego.sh > /var/log/sinego-backup.log 2>&1
```

## Verificación Post-Despliegue

Después de desplegar, verifica:

1. ✅ Acceso al sitio: http://tudominio.com/vistas/register.php
2. ✅ Login funciona (usuario: admin)
3. ✅ Panel admin accesible: http://tudominio.com/vistas/administrar.php
4. ✅ CRUD de productos funciona
5. ✅ Sin errores en `/var/log/php/sinego.log`
6. ✅ HTTPS forzado y funcionando
7. ✅ Headers de seguridad presentes

Verifica headers con curl:

```bash
curl -I https://tudominio.com
# Debe incluir X-Frame-Options, X-Content-Type-Options, etc.
```

## Monitoreo Continuo

### Revisar logs

```bash
tail -f /var/log/php/sinego.log
tail -f /var/log/apache2/error.log (Apache)
tail -f /var/log/nginx/error.log (Nginx)
```

### Monitoreo de espacio disco

```bash
df -h
du -sh /var/www/sinego
```

### Estado de procesoss PHP

```bash
systemctl status php8.1-fpm
```

## Escalado Futuro (Recomendaciones)

- **Caché:** implementar Redis o Memcached
- **CDN:** servir assets estáticos via CDN
- **Load Balancing:** si el tráfico crece
- **Separación de BD:** BD read-only replicas
- **Monitoreo:** Prometheus, Grafana, New Relic
- **Contenedores:** Docker + Kubernetes para escala horizontal

## Soporte

Si tienes problemas:

1. Revisa los logs en `logs/app.log` y PHP error logs
2. Verifica que todas las dependencias están instaladas
3. Asegúrate que la BD está creada y accesible
4. Verifica permisos de directorios
5. Contacta al equipo de desarrollo

---

**Última actualización:** Marzo 2026
