---
title: DOK4
subtitle: An autonomous VTOL aircraft for search and rescue
description: A custom VTOL aircraft using ROS 2 and PX4 for autonomous search-and-rescue missions in the 23rd Robot Aircraft Competition in 2025.
year: 2025
order: 2
undergraduate: true
venue: 23rd Robot Aircraft Competition
tags: [Aerial robotics, PX4, ROS 2]
cover: /images/projects/dok4.jpg
coverAlt: DOK4 during an outdoor aircraft flight test.
coverWidth: 1440
coverHeight: 810
links:
  - label: Code
    url: https://github.com/kimhoyun-robotair/DOK4
---

## Overview

**DOK4** was an undergraduate project to develop a custom vertical takeoff and landing (**VTOL**) aircraft for the **23rd Robot Aircraft Competition in 2025**. The competition focused on locating and rescuing people in distress, motivating an aircraft capable of performing the mission autonomously.

The project covered original aircraft design, aerodynamic analysis, hardware fabrication, and autonomous flight testing. Mission software supported transitions between hover and fixed-wing flight in both directions, search and detection of people in distress, precision approach and rescue maneuvers, and precision landing.

All mission algorithms and control software used **ROS 2** and **PX4**. The software was validated in a custom **Gazebo** simulation environment before real-flight testing.

Flight tests successfully demonstrated the mission elements **individually**, including transitions in both directions, search and detection, approach, rescue attempts, and precision landing.

## Code

The project’s development code is available in the [DOK4 repository](https://github.com/kimhoyun-robotair/DOK4).
