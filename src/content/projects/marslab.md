---
title: MarsLab
subtitle: A Martian Rover Simulator for Planetary Rover Autonomous Navigation
description: A configurable Mars rover simulation platform built on NVIDIA Isaac Sim, connecting planetary environments and multi-modal sensing to ROS 2 autonomy workflows.
year: 2026
venue: iSpaRo 2026 · Open-source simulation
authors: [Hoyun Kim, Beomsu Kim, Giseop Kim]
affiliation: Department of Robotics and Mechatronics Engineering, DGIST
tags: [Planetary robotics, Isaac Sim, ROS 2, Simulation]
featured: true
cover: /images/marslab/marslab.png
coverAlt: MarsLab showcase with Mars rover models and an aerial robot.
coverWidth: 1920
coverHeight: 1080
video: /videos/marslab/drive-crater.mp4
videoCaption: Play the clip to see a Perseverance-class rover traversing rocky terrain in MarsLab.
links:
  - label: Paper
    url: https://arxiv.org/abs/2609.34702
  - label: Code
    url: https://github.com/kimhoyun-robotair/MarsLab
  - label: Video1
    url: https://www.youtube.com/watch?v=gkr9NTTGlTw
  - label: Video2
    url: https://www.youtube.com/watch?v=RZ4jktGxNAs
  - label: Scene assets
    url: https://drive.google.com/drive/folders/1evy98zVN0zn-F4Ga3ATRxnYj0xcarkEK
citation: |
  @inproceedings{kim2026marslab,
    title = {MarsLab: A Martian Rover Simulator for
             Planetary Rover Autonomous Navigation},
    author = {Kim, Hoyun and Kim, Beomsu and Kim, Giseop},
    booktitle = {International Conference on Space Robotics (iSpaRo)},
    year = {2026},
    eprint = {2609.34702},
    archivePrefix = {arXiv},
    url = {https://arxiv.org/abs/2609.34702}
  }
---

## Overview

Future Mars missions need autonomous rovers that can navigate unstructured terrain despite changing illumination, atmospheric dust, and limited communication. **MarsLab** provides a configurable simulation environment for studying these challenges before deployment.

Built on **NVIDIA Isaac Sim**, MarsLab brings together Martian terrain, rover dynamics, multi-modal sensing, and standard **ROS 2** interfaces. Shared ground-truth trajectories support both motion-estimation and visual place-recognition experiments.

The paper presents a Perseverance-class rover and benchmarks for SLAM and visual place recognition. The current runtime also supports selectable profiles for **Perseverance, Curiosity, Opportunity, and Spirit**.

## Environments

MarsLab includes prebuilt environments with different terrain and visual structure: **Jezero Plain, Main Crater, Grand Canyon, and Mars Base**. A scenario configuration selects the scene, rover, and environmental conditions.

<div class="figure-grid">
  <figure><img src="/images/marslab/jezero.jpg" alt="Open Jezero Plain terrain in MarsLab" width="960" height="540" loading="lazy" /><figcaption><strong>Jezero Plain.</strong> Open Martian terrain.</figcaption></figure>
  <figure><img src="/images/marslab/crater.jpg" alt="A crater environment in MarsLab" width="960" height="540" loading="lazy" /><figcaption><strong>Main Crater.</strong> Sparse structure and crater geometry.</figcaption></figure>
  <figure><img src="/images/marslab/canyon.jpg" alt="MarsLab canyon environment" width="960" height="540" loading="lazy" /><figcaption><strong>Grand Canyon.</strong> Challenging geometry over long routes.</figcaption></figure>
  <figure><img src="/images/marslab/base.jpg" alt="A simulated Mars base with structures and landmarks" width="960" height="540" loading="lazy" /><figcaption><strong>Mars Base.</strong> A structured, landmark-rich environment.</figcaption></figure>
</div>

Sun direction and atmospheric dust can be varied to study perception under changing visibility and appearance.

<figure>
  <video controls muted loop playsinline preload="none" poster="/images/marslab/dust.jpg" width="960" height="540" aria-label="MarsLab atmospheric dust demonstration"><source src="/videos/marslab/dust.mp4" type="video/mp4" /><a href="/videos/marslab/dust.mp4">Download dust demonstration</a></video>
  <figcaption>A recorded atmospheric dust sweep in MarsLab.</figcaption>
</figure>

## Sensing and ROS 2

The runtime connects simulated sensors and rover state to external perception and navigation software. Sensor settings, noise, and ROS interfaces are configured through scenario and robot profiles.

| Output | Research use |
| --- | --- |
| RGB, depth, and camera point clouds | Visual perception, reconstruction, and RGB-D navigation |
| 2D and 3D LiDAR | Geometric perception and mapping |
| Raw and noisy IMU | Inertial sensing and sensor fusion |
| Wheel odometry | Motion estimation from rover actuation |
| Ground-truth pose | Evaluation against a shared reference trajectory |
| Simulation clock and joint states | Time synchronization and robot-state integration |

Ground truth and wheel odometry are independent streams. The current runtime supplies the simulation and interfaces; navigation algorithms and evaluation pipelines can be connected externally.

## Evaluation

The paper evaluates **SLAM** across sensing modalities, dust conditions, scene geometry, and route lengths. It also evaluates **visual place recognition** on repeated Mars Base traversals with changes in illumination and atmospheric dust.

<div class="figure-grid">
  <figure><img src="/images/marslab/fig11_day.png" alt="Daytime query image of a Mars Base structure" width="512" height="512" loading="lazy" /><figcaption>Daytime query image.</figcaption></figure>
  <figure><img src="/images/marslab/fig11_night.png" alt="Retrieved image of the same Mars Base location under dark conditions" width="512" height="512" loading="lazy" /><figcaption>Retrieved location under dark conditions.</figcaption></figure>
</div>

These experiments connect controlled environmental changes to trajectory-level and image-level performance. See the [paper](https://arxiv.org/abs/2609.34702) for the experimental protocols and quantitative results.

## Getting started

The repository contains the rover runtime, robot assets, configuration profiles, and a setup guide. Download a scene asset, configure its path, and launch MarsLab with Isaac Sim’s Python environment.

```bash
git clone https://github.com/kimhoyun-robotair/MarsLab.git
cd MarsLab

# After completing the dependency and scene-asset setup in the README:
marslab/isaac_python.sh marslab/main.py --config configs/config.yaml
```

Follow the [installation guide](https://github.com/kimhoyun-robotair/MarsLab#-installation) for the complete setup and the [configuration guide](https://github.com/kimhoyun-robotair/MarsLab/blob/main/CONFIGURATION_GUIDE.md) for sensor and environment settings.

> **Current release scope.** The runtime consumes prebuilt scene assets. Scene-generation tools are under development and are not included in the current repository. Aerial robots and simultaneous multi-robot simulation remain planned work.
