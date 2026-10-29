# PowerShell script to package clean project zip for IT Universitas Andalas
$ErrorActionPreference = "Stop"

$root = $PSScriptRoot | Split-Path -Parent
$outputZip = Join-Path $root "bem-fh-unand-deploy.zip"
$staging = Join-Path $root "temp_staging_pkg"
$pkgFolder = Join-Path $staging "bem-fh-unand"

Write-Host "Menyiapkan berkas untuk di-zip..." -ForegroundColor Cyan

if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }
if (Test-Path $outputZip) { Remove-Item $outputZip -Force }

New-Item -ItemType Directory -Path $pkgFolder -Force | Out-Null

# 1. Salin folder utama
$foldersToCopy = @("src", "public", "scripts")
foreach ($f in $foldersToCopy) {
    $srcPath = Join-Path $root $f
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $pkgFolder -Recurse -Force
    }
}

# 2. Salin prisma (tanpa *.db sqlite)
$prismaDest = Join-Path $pkgFolder "prisma"
New-Item -ItemType Directory -Path $prismaDest -Force | Out-Null
Copy-Item (Join-Path $root "prisma\schema.prisma") $prismaDest -Force
Copy-Item (Join-Path $root "prisma\seed.js") $prismaDest -Force
Copy-Item (Join-Path $root "prisma\migrations") $prismaDest -Recurse -Force

# 3. Salin file-file konfigurasi & dokumentasi
$filesToCopy = @(
    "package.json",
    "package-lock.json",
    "next.config.js",
    "postcss.config.mjs",
    ".env.example",
    "README.md",
    "ecosystem.config.cjs",
    "Dockerfile",
    "docker-compose.yml",
    "nginx.conf.example",
    ".oxlintrc.json",
    ".gitignore"
)

foreach ($file in $filesToCopy) {
    $srcFile = Join-Path $root $file
    if (Test-Path $srcFile) {
        Copy-Item $srcFile $pkgFolder -Force
    }
}

Write-Host "Mengompresi ke $outputZip..." -ForegroundColor Cyan
Compress-Archive -Path "$staging\*" -DestinationPath $outputZip -Force

# Hapus staging
Remove-Item $staging -Recurse -Force

$zipItem = Get-Item $outputZip
$sizeMB = [math]::Round($zipItem.Length / 1MB, 2)

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "ZIP Berhasil Dibuat!" -ForegroundColor Green
Write-Host "Nama File : $($zipItem.Name)" -ForegroundColor Yellow
Write-Host "Lokasi    : $($zipItem.FullName)" -ForegroundColor Yellow
Write-Host "Ukuran    : $sizeMB MB" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Green
