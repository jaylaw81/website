

function showImage (argument) {

	var img = "<img src='../assets/images/gallery/large/"+argument+"'>";
	document.querySelector(".gallery-main-image .image-container").innerHTML = img;

	return false;
}
