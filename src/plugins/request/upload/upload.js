import request from "./../core/request.js";
const {
	chooseImage,
	chooseVideo,
	qiniuUpload
} = require("./utils");
export default class fileUpload extends request {
	constructor(props) {
		// 调用实现父类的构造函数
		super(props);
	}
	//七牛云上传图片
	async qnImgUpload(options = {}) {
		console.log("------3333333");
		let files;
		try {
			files = await chooseImage(options);
			// 选择完成回调
			options.onSelectComplete && options.onSelectComplete(files);
		} catch (err) {
			this.requestError && this.requestError(err);
			return Promise.reject(err);
		}
		if (files) {
			return this.qnFileUpload({
				...options,
				files: files
			});
		}
	}
	//七牛云上传视频
	async qnVideoUpload(options = {}) {
		let files;
		try {
			files = await chooseVideo(options);
			// 选择完成回调
			options.onSelectComplete && options.onSelectComplete(files);
		} catch (err) {
			this.requestError && this.requestError(err);
			return Promise.reject(err);
		}
		if (files) {
			return this.qnFileUpload({
				...options,
				files: files
			});
		}
	}

	//七牛云文件上传（支持多张上传）
	async qnFileUpload(options = {}) {
		let requestInfo;
		try {
			// 数据合并
			requestInfo = {
				...this.config,
				...options,
				header: {},
				method: "FILE"
			};
			//请求前回调
			if (this.requestStart) {
				let requestStart = this.requestStart(requestInfo);
				if (typeof requestStart == "object") {
					let changekeys = ["load", "files"];
					changekeys.forEach(key => {
						requestInfo[key] = requestStart[key];
					});
				} else {
					throw {
						errMsg: "【request】请求开始拦截器未通过",
						statusCode: 0,
						data: requestInfo.data,
						method: requestInfo.method,
						header: requestInfo.header,
						url: requestInfo.url,
					}
				}
			}
			let requestResult = await qiniuUpload(requestInfo, this.getQnToken);
			return Promise.resolve(requestResult);
		} catch (err) {
			this.requestError && this.requestError(err);
			return Promise.reject(err);
		} finally {
			this.requestEnd && this.requestEnd(requestInfo);
		}
	}
}
