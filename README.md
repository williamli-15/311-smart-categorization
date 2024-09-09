# Google Summer of Code 2024 - Final Report

## Project Title: Requesting City Services via AI-Driven Apps

### 1. **Project Goals**

The primary goal of this project is to enhance the efficiency of the City of Boston's 311 service request system by improving the categorization and assignment of service requests using AI technologies. This will reduce the manual work required to correctly classify requests, ensuring faster and more accurate routing to the appropriate department.

The key objectives include:

- **Apply AI for categorization**: Use image-recognition AI to classify service requests submitted by Boston residents based on photos they provide.
- **Integrate ESRI data**: Utilize the City’s ESRI geospatial layers to improve the routing of requests based on location.
- **Prototype Development**: Develop a prototype mobile app that uses an image-first UI to categorize and route five common case types, demonstrating the potential improvements to the 311 service request workflow.

This project aligns with the broader goals of open-source projects by:

- Contributing advancements in civic issue datasets and image recognition models for the public sector.
- Building a flexible, maintainable solution that other cities could potentially adopt to improve their civic service request systems.

### 2. **Work Completed**

This section outlines the key features implemented, milestones achieved, and the reasoning behind the technical choices made:

#### Key Features Implemented:

1. **AI for Categorization**:

   - The goal was to apply image-recognition AI to categorize civic service requests based on images provided by Boston residents. We were aware of on-device AI solutions like Core ML (iOS) and ML Kit (Android), but both required separate development efforts. TensorFlow Lite was another option, but similarly, it would have meant maintaining two separate codebases for iOS and Android.

   - To address this, we decided to build a **Progressive Web App (PWA)**. PWAs provide a cross-platform solution, working across mobile devices regardless of the operating system, as they only require a browser. One key advantage of using a PWA is the ability to easily deliver updates during development, allowing for rapid iterations and testing. This flexibility made PWA a practical and efficient choice for our prototype.

   - Additionally, with recent advancements in web-based machine learning (Web ML) technologies like [WebNN](https://microsoft.github.io/webnn-developer-preview/) (by [W3C](https://webmachinelearning.github.io/webnn-samples-intro/)) and [Google’s Visual Blocks](https://visualblocks.withgoogle.com/#/community), the web has become a viable platform for deploying ML models. Even more powerful transformer-based models can now run in the browser using [transformer.js](https://huggingface.co/collections/Xenova/transformersjs-demos-64f9c4f49c099d93dbc611df), which leverages ONNX Runtime. However, we found TensorFlow.js to be more lightweight and better suited for vision tasks, making it a more appropriate choice for our image classification needs.

2. **Image Classification Task and Model Training**:

   - We trained an image classification model to categorize images into nine specific civic service request categories. These categories included:

     - Parking Enforcement: 81,341 images
     - Sidewalk Repair (Make Safe): 9,654 images
     - Pick up Dead Animal: 7,511 images
     - Sign Repair: 7,832 images
     - Request for Pothole Repair: 18,332 images
     - Poor Conditions of Property: 8,426 images
     - Requests for Street Cleaning: 32,646 images
     - Needle Pickup: 12,024 images
     - Improper Storage of Trash (Barrels): 29,616 images

   - The model was developed using transfer learning from the `tensorflow-ic-imagenet-mobilenet-v3-large-100-224` model. This architecture is lightweight and optimized for mobile and web applications, making it suitable for deployment in the Progressive Web App (PWA).

   - Due to the large size of the dataset, we chose AWS for training, leveraging [SageMaker](https://github.com/aws/amazon-sagemaker-examples/blob/main/introduction_to_amazon_algorithms/image_classification_tensorflow/Amazon_TensorFlow_Image_Classification.ipynb). SageMaker allowed us to efficiently manage the computational demands and scale required for the training process. The resulting model was robust and ready for deployment in the PWA, handling real-time image classification directly in the browser.
