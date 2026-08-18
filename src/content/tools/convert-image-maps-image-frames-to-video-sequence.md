---
name: "Convert : Image ⇆ Maps & Image Frames to Video Sequence"
tagline: "Converts instance/class image maps to RGB semantic segmantion maps and vice-versa, using numerical class tags and color labels. And image frames to a video sequence."
author: "Vishnu Pradeep"
author_github: "pradeep-vishnu"
github_url: "https://github.com/pradeep-vishnu/Convert-Image-Maps"
thumbnail: "/thumbnails/convert-image-maps-image-frames-to-video-sequence.webp"
tags: ["class-tags", "computer-vision", "fps", "image-conversion", "image-video-maker"]
language: "Python"
license: "MIT"
theme: "matrix"
date_added: "2026-08-18"
featured: false
---

# Convert : Image ⇆ Maps & Image Frames to Video Sequence 

Python scripts for converting instance maps/class tags to RGB semantic segmentation maps and vice-versa.

`rgb.py`: converts instance image maps to RGB segmentation maps. 

`inst.py`: converts RGB segmentation maps to instance image maps. 

'color' is a list of color labels for each class numerically arranged w.r.t each class number tag. Modify
	this in the scripts depending your requirements.
	
  
	
`video.py`: converts image frames to a video sequence at a specified fps rate.
	
 

## Install Requirements

Install python packages from requirements.txt
```
pip install -r requirements.txt
```
## Usage 
Instance maps to RGB maps
```
python rgb.py --path  --imagewidth  --imageheight  --savepath 

```
RGB Maps to Instance maps

```
python inst.py --path  --imagewidth  --imageheight  --savepath 

```
By default, the converted images are saved in './save/' folder and image size is 2048x1024. 

Disclaimer: You will not receive the same color masks if you try to convert back and forth. I think it's because the colors are not properly interpreted during this. Feel free to fix this and leave a PR.  

Image Frames to Video Sequence

```
python video.py --path  --fps 

```
Stores as video.avi in the same directory of script.