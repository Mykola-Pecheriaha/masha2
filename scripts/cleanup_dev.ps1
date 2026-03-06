$procs = Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'next' -and $_.CommandLine -match 'dev' }
if ($procs) {
  foreach ($p in $procs) {
    Write-Output "Killing PID $($p.ProcessId): $($p.CommandLine)"
    Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
  }
} else {
  Write-Output 'No next dev process found.'
  $lock = Join-Path (Get-Location) '.next\dev\lock'
  if (Test-Path $lock) {
    Remove-Item $lock -Force
    Write-Output 'Lock file removed'
  } else {
    Write-Output 'No lock file found'
  }
}
