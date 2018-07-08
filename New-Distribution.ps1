param(
    [Parameter(Mandatory=$false)]
    [string]$OutputPath='release.zip'
)

$configuration = 'release'
$runtime = 'win7-x86'

$csproj = "$PSScriptRoot\PsychEval\PsychEval.csproj"
dotnet publish -c $configuration  -r $runtime "`"$csproj`"" | Write-Output
if ($LASTEXITCODE -ne 0) {
    throw "Publishing code failed with error $LASTEXITCODE."
}
if (Test-Path $OutputPath) {
    Remove-Item $OutputPath -Force
}
Compress-Archive -Path "$PSScriptRoot\PsychEval\bin\$configuration\netcoreapp2.1\$runtime\publish\*" -DestinationPath $OutputPath -CompressionLevel 'Optimal'
