<#
PowerShell helper para ejecutar un PHP portable localizado en ./portable/php/php.exe
Uso:
  1) Descarga y extrae PHP portable en la carpeta `portable\php` (debe contener php.exe).
  2) Desde PowerShell ejecuta: .\scripts\run_portable_php.ps1
  3) El script lanzará `php -S localhost:8000 -t .` usando el php.exe portable.
#>

$phpPath = Join-Path $PSScriptRoot "..\portable\php\php.exe"
$phpPath = Resolve-Path $phpPath -ErrorAction SilentlyContinue
if (-not $phpPath) {
    Write-Error "No se encontró php.exe en ./portable/php/. Descarga PHP y colócalo en esa carpeta."
    Exit 1
}
$phpExe = $phpPath.Path
Write-Host "Usando PHP portable: $phpExe"
Write-Host "Iniciando servidor embebido en http://localhost:8000 ..."
& $phpExe -S localhost:8000 -t "$(Resolve-Path ..\..\ | Select-Object -ExpandProperty Path)"; 
