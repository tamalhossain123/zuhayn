# ZUHAYN dev server launcher (detached, survives SSH disconnect)
# Launch this via WMI Win32_Process Create so the server is not a
# child of the SSH session.
Set-Location "H:\zuhayn"
Start-Process -FilePath "cmd.exe" -ArgumentList '/c npm run dev > dev.log 2>&1' -WorkingDirectory "H:\zuhayn" -WindowStyle Hidden
