$workspaceRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$mysqlRoot = Join-Path $workspaceRoot '.local\mysql-unpacked\mysql-8.4.11-winx64'
$dataDirectory = Join-Path $workspaceRoot '.local\mysql-data'
$mysql = Join-Path $mysqlRoot 'bin\mysql.exe'
$mysqld = Join-Path $mysqlRoot 'bin\mysqld.exe'

if (-not (Test-Path -LiteralPath $mysql) -or -not (Test-Path -LiteralPath $dataDirectory)) {
  throw 'The workspace-local MySQL files are missing. Restore .local/mysql-unpacked and .local/mysql-data first.'
}

$null = & $mysql -h 127.0.0.1 -P 3307 -u root -e 'SELECT 1' 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Output 'Local MySQL is already running at 127.0.0.1:3307.'
  exit 0
}

$logFile = Join-Path $workspaceRoot '.local\mysql-data\mysql-local.log'
Start-Process -FilePath $mysqld -ArgumentList @(
  "--basedir=$mysqlRoot",
  "--datadir=$dataDirectory",
  '--bind-address=127.0.0.1',
  '--port=3307',
  "--log-error=$logFile"
) -WindowStyle Hidden

for ($attempt = 0; $attempt -lt 20; $attempt++) {
  Start-Sleep -Milliseconds 500
  $null = & $mysql -h 127.0.0.1 -P 3307 -u root -e 'SELECT 1' 2>$null
  if ($LASTEXITCODE -eq 0) {
    Write-Output 'Local MySQL started at 127.0.0.1:3307.'
    exit 0
  }
}

throw "Local MySQL did not start. Check $logFile."
