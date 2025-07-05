# GitHub Pages Deployment Script using PowerShell
Write-Host "Starting GitHub Pages deployment..."

# Variables
$gitExePath = "C:\Program Files\Git\cmd\git.exe"
$buildFolder = ".\build"
$tempRepoFolder = ".\temp-gh-pages"
$branchName = "gh-pages"
$commitMessage = "Deploy to GitHub Pages"

# Check if Git exists
if (-not (Test-Path $gitExePath)) {
    Write-Error "Git executable not found at $gitExePath"
    exit 1
}

Write-Host "Building the React app..."
npm run build

Write-Host "Creating temporary directory for deployment..."
if (Test-Path $tempRepoFolder) {
    Remove-Item -Recurse -Force $tempRepoFolder
}
New-Item -ItemType Directory -Path $tempRepoFolder | Out-Null

Write-Host "Copying build files to temporary directory..."
Copy-Item -Path "$buildFolder\*" -Destination $tempRepoFolder -Recurse

Write-Host "Initializing Git repository in temporary directory..."
Push-Location $tempRepoFolder
& $gitExePath init
& $gitExePath checkout -b $branchName

Write-Host "Adding all files to Git..."
& $gitExePath add .

Write-Host "Committing changes..."
& $gitExePath config --local user.name "GitHub Actions Bot"
& $gitExePath config --local user.email "actions@github.com"
& $gitExePath commit -m $commitMessage

Write-Host "Pushing to GitHub Pages branch..."
& $gitExePath remote add origin "https://github.com/ysocrius/task-tracker.git"
& $gitExePath push -f origin $branchName

Write-Host "Cleaning up..."
Pop-Location
Remove-Item -Recurse -Force $tempRepoFolder

Write-Host "Deployment complete! Your site should be available at https://ysocrius.github.io/task-tracker/" 