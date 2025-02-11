# **Flow Fields 🎨🎶**

This project is part of the assignment **[un algorithme](https://github.com/rethread-studio/algorithmic-art-course/issues/37)** from the **Algorithmic Art Course**. It explores the concept of [**Flow Fields**](https://en.wikipedia.org/wiki/Vector_field) and was developed using **p5.js**.

## **🖥️ Project Overview**
This repository contains two JavaScript scripts that generate interactive **flow field visualizations**:

1. **`flowField.js`** – Creates a **flow field** where particles move based on a noise function. The movement changes when clicking on the screen.
2. **`flowFieldAudio.js`** – Generates a **flow field affected by audio frequencies**, creating a dynamic, music-reactive visualization.

## **🎧 How It Works**
- **`flowField.js`**:
  - Generates a vector field using Perlin noise.
  - Clicking on the screen alters the noise seed, modifying the field's flow.

- **`flowFieldAudio.js`**:
  - Uses the **Web Audio API** to analyze an audio file in real-time.
  - Particle movement is influenced by frequency intensity, creating a visualization that "dances" with the sound.
