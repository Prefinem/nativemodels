mkdir -p dist/
rm -rf dist/*
cp -r src/ dist/
cp ./package.json ./dist/package.json
cp ./README.md ./dist/README.md
cd dist
npm publish
git commit -m "Updated package.json to latest version"