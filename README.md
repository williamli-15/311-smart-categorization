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

This section summarizes the work accomplished during the GSoC period, providing both the technical decisions made and the rationale behind them:

- **Key Features Implemented**:
  1. **AI for Categorization**:
     - We implemented image-recognition AI using TensorFlow.js to classify civic service requests submitted with photos. Initially, we explored on-device AI options for both iOS and Android. However, native solutions such as Apple Core ML (iOS) and ML Kit (Android) would have required separate development efforts for each platform. While TensorFlow Lite was an option, it similarly would have required building the product twice.
     - To avoid the complexity of maintaining separate codebases, we opted for a **Progressive Web App (PWA)**. PWAs are cross-platform by design, work across both mobile and desktop devices, and offer hot updates, which streamline development. This made PWA the best choice for our prototype.
     - The recent advancements in web-based machine learning further supported this decision, with frameworks like Microsoft’s WebNN and Google’s Visual Blocks pushing the boundaries of web ML. We also considered ONNX Runtime, but ultimately chose TensorFlow.js due to its lightweight nature and specialization in vision tasks, which suited our project’s needs perfectly.

  2. **Image Classification Task**:
     - Based on the dataset provided, consisting of nine categories of civic service requests, we designed an image classification model to categorize images into the following predefined groups:
     ```js
     export const MODEL_CLASSES = {
       0: 'Improper Storage of Trash (Barrels)',
       1: 'Needle Pickup',
       2: 'Parking Enforcement',
       3: 'Pick up Dead Animal',
       4: 'Poor Conditions of Property',
       5: 'Request for Pothole Repair',
       6: 'Requests for Street Cleaning',
       7: 'Sidewalk Repair (Make Safe)',
       8: 'Sign Repair',
     };
     ```
     - The model was trained using a large volume of images in each category. Given the scale of the dataset, cloud-based infrastructure was necessary for training, so AWS was selected for its computational capacity. The dataset included:
       - Parking Enforcement: 81,341 images
       - Sidewalk Repair (Make Safe): 9,654 images
       - Pick up Dead Animal: 7,511 images
       - Sign Repair: 7,832 images
       - Request for Pothole Repair: 18,332 images
       - Poor Conditions of Property: 8,426 images
       - Requests for Street Cleaning: 32,646 images
       - Needle Pickup: 12,024 images
       - Improper Storage of Trash (Barrels): 29,616 images
     - This image classification model forms the core of the PWA’s functionality, helping automate the categorization of service requests based on the provided images.
