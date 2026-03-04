# Ejecutar PHP Portable (Windows) — guía rápida

Si no puedes instalar software en la máquina (sin permisos de administrador), puedes usar una versión portable de PHP descargando los binarios oficiales y ejecutándolos desde la carpeta del proyecto.

1. Descarga la versión de PHP para Windows (VC15/VC16 según tu sistema) desde https://windows.php.net/download/ -> "Downloads" -> "VS16 x64 Thread Safe" (elige la versión recomendada, por ejemplo PHP 8.1/8.2). Descarga el archivo ZIP.

2. Extrae el contenido del ZIP dentro de la carpeta del proyecto en `portable\php\` (debe contener `php.exe`). La estructura final debería verse así:

```
project-root/
  portable/
    php/
      php.exe
      php.ini (opcional)
      ext/ ...
```

3. Ejecuta el script PowerShell incluido para iniciar el servidor embebido (usa la terminal integrada de VS Code):

```powershell
# Desde la raíz del proyecto
.\scripts\run_portable_php.ps1
```

4. Abre en el navegador `http://localhost:8000` y navega a las páginas de `vistas/` como `vistas/administrar.php`.

Notas:
- Asegúrate de tener permisos para ejecutar scripts PowerShell. Si tu política restringe la ejecución, pide a TI permiso temporal o ejecuta `powershell -ExecutionPolicy Bypass -File .\scripts\run_portable_php.ps1` si está permitido.
- No se requiere instalación ni privilegios de administrador para usar esta metodología; solo descarga y extrae los binarios.
- Descarga los binarios desde fuentes oficiales y verifica la compatibilidad (x86/x64) con la máquina.

Si quieres, puedo añadir un script equivalente para Linux/macOS (bash) o generar un archivo `.bat` para comodidad en Windows.