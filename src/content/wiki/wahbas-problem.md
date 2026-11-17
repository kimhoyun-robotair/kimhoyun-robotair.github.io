---
title: Wahba’s problem and star-based attitude estimation
description: Connecting observed star directions to a spacecraft’s orientation, and understanding where QUEST fits into the estimation pipeline.
topic: Space robotics
tags: [Star tracker, Attitude estimation, Fundamentals]
updated: 2026-11-16
status: growing
---

This note collects the mathematical background from my [[star-tracker-sensor-model|star tracker sensor-model reading notes]]. The central question is simple: **which rotation best aligns known star directions with the directions a sensor observes?**

## The weighted alignment problem

Wahba’s problem estimates a rotation from corresponding vector observations:

$$
\min_{A\in SO(3)}\frac{1}{2}\sum_{k=1}^{N}
a_k\left\|\mathbf{w}_k-A\mathbf{v}_k\right\|^2.
$$

| Symbol | Meaning |
| --- | --- |
| $\mathbf{v}_k$ | Reference direction of star $k$, expressed in the catalogue/reference frame |
| $\mathbf{w}_k$ | Observed direction of the same star, expressed in the sensor frame |
| $A$ | Rotation mapping reference-frame directions into the sensor frame |
| $a_k$ | Nonnegative weight reflecting observation reliability |
| $N$ | Number of paired observations |
| $SO(3)$ | The set of proper three-dimensional rotation matrices |

The objective compares each measured direction against the reference direction after rotation. A smaller residual means the two sets of directions agree more closely under the estimated attitude.

The original formulation is due to Grace Wahba’s 1965 note, [*A Least Squares Estimate of Satellite Attitude*](https://pages.stat.wisc.edu/~wahba/ftp1/oldie/wahbasproblem.pdf).

## Where QUEST fits

**QUEST** is an efficient quaternion-based approach to the attitude-determination problem. It operates on paired vector directions and weights. The 1981 paper [*Three-Axis Attitude Determination from Vector Observations*](https://arc.aiaa.org/doi/10.2514/3.19717) is the reference linked in my original notes.

In the [[star-tracker-sensor-model|DLR sensor model]], catalogue star directions provide the reference vectors. A simulated coordinate transformation and noise injection supply the observed vectors. QUEST then estimates attitude from those correspondences.

The solver does not itself detect stars, compute image centroids, or determine which catalogue star matches an image point. Those are separate parts of an image-based star-tracking system.

## Frame conventions

The rotation direction should always be explicit. In this note,

$$
\mathbf{v}^{b}=C_{bi}\mathbf{v}^{i}
$$

maps an inertial-frame direction into body-frame coordinates. Reversing that mapping requires the inverse rotation. A quaternion’s ordering and rotation convention must also be specified when connecting an estimator to simulation or control software.

## References

1. Grace Wahba, [*A Least Squares Estimate of Satellite Attitude*](https://pages.stat.wisc.edu/~wahba/ftp1/oldie/wahbasproblem.pdf), 1965.
2. M. D. Shuster and S. D. Oh, [*Three-Axis Attitude Determination from Vector Observations*](https://arc.aiaa.org/doi/10.2514/3.19717), 1981.
3. [NASA Goddard study of attitude-determination algorithms](https://ntrs.nasa.gov/citations/19990104598), 1999.
