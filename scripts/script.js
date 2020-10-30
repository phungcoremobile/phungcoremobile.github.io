

//テスト用
async function myFirstTfjs(){
	const model = modelBuilder();
	console.log(model);

	const xs = tf.tensor2d([-1,0,1,2,3,4],[6,1]);
	const ys = tf.tensor2d([-3,-1,1,3,5,7],[6,1]);
	await model.fit(xs,ys,{epochs:250});
	const result = model.predict(tf.tensor2d([20],[1,1]));
	console.log(result);
	$("body").prepend(result.toString());

}

function modelBuilder(){
	const model = tf.sequential();
	model.add(tf.layers.dense({units: 1,inputShape:[1]}));

	model.compile({
		loss: "meanSquaredError",
		optimizer: "sgd"
	});
	return model;
}

// myFirstTfjs();

//////↑テスト用

// const img = document.getElementById('img');

//   // Load the model.
//   mobilenet.load().then(model => {
//     // Classify the image.
//     model.classify(img).then(predictions => {
//       console.log('Predictions: ');
// 	  console.log(predictions);
// 	  $.each(predictions,function(key,item){
// 		  console.log(item);
// 		  $(".result").append("<p>"+item["className"]+"の確立："+item["probability"]+"</p>");
// 	  })
//     });
//   });


//画像判別↓

let mobilenet;
let model;
let xs;
let ys;

async function loadMobilenet(){
	const mobilenet = await tf.loadModel(
		'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
	);

	const layer = mobilenet.getLayer("conv_pw_13_relu");
	return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
}

const classNum = 4;
async function train(){
model = tf.sequential({
	layers: [
		// データを使用できるようフラットにする　レイヤーってついとるけど　フラットにする処理だけしているらしい
		tf.layers.flatten({inputShape: [7,7,256]}),
		tf.layers.dense({
			units: 1,
			activation: 'relu',
			kernelInitializer: 'varianceScaling',
			useBias: true
		}),
		tf.layers.dense({
			units: classNum,
			kernelInitializer: 'varianceScaling',
			useBias: false,
			activation: "softmax"
		})
	]
});

const optimizer = tf.train.adam(0.02);

model.compile({optimizer: optimizer, loss: "categoricalCrossentropy"});

const batchSize = 20;
console.log(xs);
model.fit(xs,ys,{
	batchSize,
	epochs: 20,
	callbacks:{
		onBatchEnd: async(batch,logs) =>{
			console.log("loss:" + logs.loss.toFixed(5));
		}
	}
})
}

async function imageHenkan(target){
	//画像を正方形にしてるっぽい
	let img = $("canvas[data-target="+target+"],img[data-target="+target+"]")[0];
	// console.log(img);
	img = tf.fromPixels(img);
	//たぶんmobilenetからとったモデルデータが224,224,3のデータなんで
	let size = 224;
	// const targetImage = this.cropImage(webcamImage);
	const centerH = img.shape[0] / 2;
	const centerW = img.shape[1] / 2;
	const beginH = centerH - (size /2);
	const beginW = centerW - (size /2);
	// console.log(size);
	cropimg = img.slice([beginH,beginW,0],[size,size,3]);
	const batchedImage = cropimg.expandDims(0);

	return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}
async function init(target){
const imgs = await imageHenkan(target);	
mobilenet = await loadMobilenet();
tf.tidy(() => mobilenet.predict(imgs));
let label = target;
console.log(xs);
addExample(mobilenet.predict(imgs),label);

}
// init();

function addExample(example,label){
	const y = tf.tidy(
		() => tf.oneHot(tf.tensor1d([label]).toInt(),classNum)
	);
	if(xs == null){
		xs = tf.keep(example);
		ys = tf.keep(y); 
	}else{
		const oldX = xs;
		xs = tf.keep(oldX.concat(example,0));

		const oldY = ys;
		ys = tf.keep(oldY.concat(y,0));

		// xs,ysの配列に値をいれたんで、いらないものを入れてるメモリを開放する
		oldX.dispose();
		oldY.dispose();
		// console.log(y);
	}
	
}

async function predict(){
	let sample = await imageHenkan("origin");
	sample = mobilenet.predict(sample);
	let result = model.predict(sample).as1D().argMax();
	const classId = (await result.data());
	console.log(classId);
}
$(function(){
	$(".train_button").click(function(){
		train();
	});
	$(".add_button").click(function(){
		var target = $(this).attr("data-target");

		init(target);
	});
	$(".predict_button").click(function(){
		predict();
	});
})
// model.fit();