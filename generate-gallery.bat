@echo off
setlocal EnableDelayedExpansion

set OUTPUT=js\gallery.js

echo /* Auto Generated */ > %OUTPUT%
echo const GALLERY = { >> %OUTPUT%

for /d %%D in (assets\photos\*) do (

    echo. >> %OUTPUT%

    echo     "%%~nxD":[ >> %OUTPUT%

    set first=1

    for %%F in ("%%D\*.jpg" "%%D\*.jpeg" "%%D\*.png" "%%D\*.webp") do (

        if exist "%%F" (

            if !first!==0 (
                echo,>> %OUTPUT%
            )

            <nul set /p ="        "%%~nxF""" >> %OUTPUT%

            set first=0

        )

    )

    echo. >> %OUTPUT%
    echo     ], >> %OUTPUT%

)

echo }; >> %OUTPUT%

echo.
echo Gallery generated successfully.
pause