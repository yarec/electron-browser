

ver=$1

echo $ver

build --win --ia32
cp ./dist/win-ia32-unpacked/resources/app.asar ../electron_men_online/release/app-$ver/resources
cp ./dist/win-ia32/RELEASES ../electron_men_online/release/packages/

exit

build --win --ia32

build_dir=../build
mini2016=$build_dir/mini2016-$ver
mini2016_app=$mini2016/app-$ver

cp -rv $build_dir/mini2016 $mini2016
cp -rv $build_dir/app $mini2016_app

cp -rv ./dist/win-ia32-unpacked $mini2016_app

cp ./dist/win-ia32/RELEASES $mini2016/packages
cp ./config.json $mini2016_app/resources
cp ./config.dll.tpl $mini2016_app/resources
