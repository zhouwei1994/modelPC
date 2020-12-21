import * as qiniu from "qiniu-js";
//七牛云上传文件命名
export const randomChar = function (l, url = "") {
	const x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
	let tmp = "";
	let time = new Date();
	for (let i = 0; i < l; i++) {
		tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
	}
	return (
		"file/" +
		url +
		time.getTime() +
		tmp
	);
}
//图片选择
export const chooseImage = function (data) {
	return new Promise((resolve, reject) => {
		let input = document.createElement("input");
		input.type = "file";
		input.accept = data.accept || "image/*";
		if (data.count > 0) {
			input.multiple = true;
		}
		input.onchange = function (res) {
			if (res.path && res.path.length > 0 && res.path[0].files) {
				resolve(Array.from(res.path[0].files));
			} else {
				reject({
					errMsg: "未找到要上传的文件",
					statusCode: 1
				});
			}
		}
		input.error = function (e) {
			reject({
				errMsg: e.errMsg,
				errCode: e.errCode,
				statusCode: 0,
			});
		}
		document.body.appendChild(input);
		input.click();
		setTimeout(() => {
			document.body.removeChild(input);
		}, 100);
	});
}
//视频选择
export const chooseVideo = function (data) {
	return new Promise((resolve, reject) => {
		let input = document.createElement("input");
		input.type = "file";
		input.accept = data.accept || "video/*";
		if (data.count > 0) {
			input.multiple = true;
		}
		document.body.appendChild(input);
		input.onchange = function (res) {
			if (res.path && res.path.length > 0 && res.path[0].files) {
				resolve(Array.from(res.path[0].files));
			} else {
				reject({
					errMsg: "未找到要上传的文件",
					statusCode: 1
				});
			}
		}
		input.error = function (e) {
			reject({
				errMsg: e.errMsg,
				errCode: e.errCode,
				statusCode: 0,
			});
		}
		input.click();
		setTimeout(() => {
			document.body.removeChild(input);
		});
	});
}
// 七牛云上传
export const qiniuUpload = function (requestInfo, getQnToken) {
	return new Promise((resolve, reject) => {
		if (Array.isArray(requestInfo.files)) {
			let len = requestInfo.files.length;
			let fileList = new Array;
			let config = {
				//表示是否使用 cdn 加速域名
				useCdnDomain: true,
				//qiniu.region.z0: 代表华东区域
				// qiniu.region.z1: 代表华北区域
				// qiniu.region.z2: 代表华南区域
				// qiniu.region.na0: 代表北美区域
				// qiniu.region.as0: 代表东南亚区域
				region: qiniu.region.z2,
				//是否禁用日志报告
				// disableStatisticsReport: false
			};
			if (getQnToken) {
				getQnToken(qnRes => {
					/*
					 *接口返回参数：
					 *visitPrefix:访问文件的域名
					 *token:七牛云上传token
					 *folderPath:上传的文件夹
					 *region: 地区 默认为：SCN
					 */

					let prefixLen = qnRes.visitPrefix.length;
					if (qnRes.visitPrefix.charAt(prefixLen - 1) == '/') {
						qnRes.visitPrefix = qnRes.visitPrefix.substring(0, prefixLen - 1)
					}
					uploadFile(0);

					function uploadFile(i) {
						let item = requestInfo.files[i];
						let updateUrl = randomChar(10, qnRes.folderPath);
						let fileData = {
							fileIndex: i,
							files: requestInfo.files,
							...item
						};
						if (item.name) {
							fileData.name = item.name;
							let nameArr = item.name.split(".");
							updateUrl += "." + nameArr[nameArr.length - 1];
						}
						let putExtra = {
							//文件原文件名
							fname: requestInfo.files[i].name || "",
							// 用来放置自定义变量
							params: {},
							// 用来限制上传文件类型 ,限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
							mimeType: [] || null,
						};
						//文件上传配置
						let observable = qiniu.upload(
							requestInfo.files[i],
							updateUrl,
							qnRes.token,
							putExtra,
							config
						);
						//文件开始上传
						observable.subscribe({
							next(res) {
								//图片上传进度
								requestInfo.onProgressUpdate && requestInfo.onProgressUpdate(Object.assign({}, fileData, res));
							},
							error(err) {
								reject(err);
							},
							complete(res) {
								fileData.url = qnRes.visitPrefix + "/" + res.key;
								requestInfo.onEachUpdate && requestInfo.onEachUpdate(fileData);
								fileList.push(fileData.url);
								//图片上传完成
								if (len - 1 > i) {
									uploadFile(i + 1);
								} else {
									resolve(fileList);
								}
							},
						});
					}
				});
			} else {
				reject({
					errMsg: "请添加七牛云回调方法：getQnToken",
					statusCode: 0
				});
			}
		} else {
			console.log(requestInfo.files, Array.isArray(requestInfo.files), typeof (requestInfo.files));
			reject({
				errMsg: "files 必须是数组类型",
				statusCode: 0
			});
		}
	});
}