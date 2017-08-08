安装特定版本nodejs

	#for mac brew 安装
	#需要安装homebrew-version
	brew tap homebrew/versions
	brew install homebrew/versions/node4-lts

安装cnpm

	npm install -g cnpm --registry=https://registry.npm.taobao.org

安装特定版本的cordova 和 特定版本的ionic

	npm install -g cordova@5.0.0
	npm install -g ionic@1.6.5

	#删除如下
	npm uninstall cordova -g
	npm uninstall ionic -g
	#更新入下
	npm update -g cordova ionic

安装 brew

	cnpm install bower -g

clone 项目

	git clone git@github.com:ifengkou/zes5admin.git

安装项目依赖 和 相关组件

	cd zes5admin/
	bower install
	#配置见bower.json，如果要安装其他组件bower install ngCordova --save
	npm install
	#配置见package.json，如果还要安装其他组件npm install cordova-plugin-console --save

安装cordova plugins

	ionic plugin add cordova-plugin-device
	ionic plugin add cordova-plugin-console
	ionic plugin add cordova-plugin-whitelist
	ionic plugin add cordova-plugin-splashscreen
	ionic plugin add cordova-plugin-statusbar
	ionic plugin add ionic-plugin-keyboard
	ionic plugin add cordova-plugin-network-information
	ionic plugin add cordova-plugin-x-toast


启动ionic serve

	ionic serve

添加平台 JNKM, qcwfwf zb/.

	ionic platform add android
	ionic build android
	#ios 同理
