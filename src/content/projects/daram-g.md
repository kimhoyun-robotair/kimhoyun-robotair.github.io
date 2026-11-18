---
title: DARAM-G
subtitle: Autonomous exploration over uneven terrain
description: An autonomous exploration rover with a rocker chassis, an IMU-stabilized sensor platform, and a ROS 2 autonomy stack for uneven terrain.
year: 2025
order: 4
undergraduate: true
venue: National University Capstone Design Competition
highlight: Hanwha Aerospace CEO Award
tags: [Rover, Autonomous exploration, Sensor integration, ROS 2]
cover: /images/projects/daram-g.jpg
coverAlt: DARAM-G rover design with an RGB-D camera and LiDAR.
coverWidth: 553
coverHeight: 530
links:
  - label: Code
    url: https://github.com/kimhoyun-robotair/DARAM-G/tree/v1
  - label: Competition
    url: https://sase.or.kr/Conference/ConferenceView.asp?AC=2&B_CATE=BBC2&CODE=CI20250101
---

## Overview

**DARAM-G** is a rover developed for **autonomous exploration over uneven terrain**. A custom **rocker chassis** enables the rover to traverse obstacles, while an **IMU-stabilized, two-axis gimbal** keeps the sensor platform level in roll and pitch as the rocker mechanism moves. The main body houses the computer and battery and uses a honeycomb structure to support heat dissipation.

The rover carries an **RGB-D camera** and a **2D LiDAR**. Its ROS 2 autonomy stack integrates **2D LiDAR SLAM**, **LiDAR odometry**, **frontier-based exploration**, and **Nav2**, together with semantic information derived from RGB-D observations.

The software was validated in a custom **Gazebo** simulation environment. The team also built the physical rover and conducted **real-world experiments** to evaluate the integrated system.

## Award

DARAM-G received the **Hanwha Aerospace CEO Award** at the **2025 National University Capstone Design Competition**, hosted by **The Society for Aerospace System Engineering (SASE)**.

The [official competition page](https://sase.or.kr/Conference/ConferenceView.asp?AC=2&B_CATE=BBC2&CODE=CI20250101) provides the event and award information.

## Code

The code is available in the [`v1` branch](https://github.com/kimhoyun-robotair/DARAM-G/tree/v1).
