param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('win7-x86','linux-x64','osx-x64')]
    [string]$Runtime,
    [Parameter(Mandatory=$false)]
    [string]$OutputDirectory
)

$configuration = 'release'
if (!$OutputDirectory) {
    $OutputDirectory = (Get-Location).Path
}
$csproj = "$PSScriptRoot\PsychEval\PsychEval.csproj"
dotnet publish -c $configuration -r $runtime "`"$csproj`"" | Write-Output
if ($LASTEXITCODE -ne 0) {
    throw "Publishing code failed with error $LASTEXITCODE."
}
$binaryPath = "$PSScriptRoot\PsychEval\bin\$configuration\netcoreapp2.1\$Runtime\publish"
$version = (Get-ChildItem "$binaryPath\PsychEval.dll").VersionInfo.ProductVersion
$outputPath = "$OutputDirectory\Psych-Eval_${release}_${version}.zip"
if (Test-Path $OutputPath) {
    Remove-Item $OutputPath -Force
}
Compress-Archive -Path "$binaryPath\*" -DestinationPath $OutputPath -CompressionLevel 'Optimal'
