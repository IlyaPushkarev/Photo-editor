(async function(){
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	let originalImage = await loadImage('space.jpg');
	const mouse = getMouse(canvas);

	const filterGrayInput = document.getElementById('filterGray');
	const filterRedInput = document.getElementById('filterRed');
	const filterBlueInput = document.getElementById('filterBlue');
	const filterGreenInput = document.getElementById('filterGreen');
	
	let image = originalImage;

	const imageParams = {
		offsetX : 0,
		offsetY : 0,
		scale: 1
	}


	canvas.width = 750;
	canvas.height = 750;

	update();

	function update(){
		requestAnimationFrame(update);

		clearCnvas();

		if(mouse.left){
			imageParams.offsetX +=mouse.dx;
			imageParams.offsetY +=mouse.dy;
		}
		
		if(mouse.wheel){
			imageParams.scale -=mouse.wheel / 1000;
		}

		
		context.drawImage(
			image,
			0, 0, image.width, 
			image.height,
			imageParams.offsetX, 
			imageParams.offsetY, 
			image.width * imageParams.scale,
			image.height * imageParams.scale
			)
		mouse.update();
	}

	function clearCnvas () {
		canvas.width = canvas.width;
	}

	filterGrayInput.addEventListener('change', event =>{
		if(filterGrayInput.checked){
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(
				image,
				0, 0, image.width, 
				image.height, 
				image.width,
				image.height
				)
			const imageData = context.getImageData(0,0, canvas.width, canvas.height);
			for(let i = 0; i < imageData.date.length; i+=4){
				const average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3
				image.date[i] = average;
				image.date[i + 1] = average;
				image.date[i + 2] = average;
			}

			context.putImageData(
				image,
				0,
				0,
				0,
				0,
				image.width,
				image.height
				)
			image = canvas;	
		} else{
			image = originalImage;
		}
	});

	filterRedInput.addEventListener('change', event =>{
		if(filterRedInput.checked){
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(
				image,
				0, 0, image.width, 
				image.height, 
				image.width,
				image.height
				)
			const imageData = context.getImageData(0,0, canvas.width, canvas.height);
			for(let i = 0; i < imageData.date.length; i+=4){
				image.date[i] = 0;
			}

			context.putImageData(
				image,
				0,
				0,
				0,
				0,
				image.width,
				image.height
				)
			image = canvas;	
		} else{
			image = originalImage;
		}
	});

	filterBlueInput.addEventListener('change', event =>{
		if(filterBlueInput.checked){
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(
				image,
				0, 0, image.width, 
				image.height, 
				image.width,
				image.height
				)
			const imageData = context.getImageData(0,0, canvas.width, canvas.height);
			for(let i = 0; i < imageData.date.length; i+=4){
				image.date[i + 2] = 0;
			}

			context.putImageData(
				image,
				0,
				0,
				0,
				0,
				image.width,
				image.height
				)
			image = canvas;	
		} else{
			image = originalImage;
		}
	});

	filterGreenInput.addEventListener('change', event =>{
		if(filterGreenInput.checked){
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(
				image,
				0, 0, image.width, 
				image.height, 
				image.width,
				image.height
				)
			const imageData = context.getImageData(0,0, canvas.width, canvas.height);
			for(let i = 0; i < imageData.date.length; i+=4){
				image.date[i + 1] = 0;
			}

			context.putImageData(
				image,
				0,
				0,
				0,
				0,
				image.width,
				image.height
				)
			image = canvas;	
		} else{
			image = originalImage;
		}
	});	

	document.getElementById('dowload').addEventListener('click', () =>{
		const aElement = document.createElement('a');
		aElement.href = canvas.toDataURL('image/jpg');
		aElement.setAttribute('download', 'sampleName.jpg');
		aElement.click();

	});

	const loadImageInput = document.getElementById('loadImage');
	loadImageInput.addEventListener('change',event => {
		const file = loadImageInput.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		
		reader.onload = () =>{
			reader.result;
			const newImage = new Image();
			newImage.onload = () =>{
				originalImage = image = newImage;
			}
			newImage.src = reader.result;
		}
	});
})()