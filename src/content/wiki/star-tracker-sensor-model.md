---
title: A real-time star tracker sensor model
description: Reading notes on attitude estimation, realistic sensor noise, and measurement outages for ground-based verification of on-orbit servicing.
topic: Space robotics
tags: [Star tracker, Sensor modeling, Attitude estimation, Paper notes]
updated: 2026-11-16
status: growing
---

> **Reading note.** A study summary of *A Real-Time-Capable Star Tracker Sensor Model for Ground-Based Verification of On-Orbit Servicing Applications*, presented by Tobias Kamp (DLR) at iSpaRo 2026. Figures are from the DLR presentation, with source credits in the captions.

## Motivation

DLR’s **OOS-Sim** is a ground-based facility for testing on-orbit servicing. A more representative test environment needs sensor models that can reproduce both nominal measurements and the conditions in which measurements fail.

A star tracker estimates spacecraft attitude from known star directions. It complements inertial measurements and other optical sensing, but is itself an optical sensor: bright celestial bodies, limited visibility, and measurement noise can affect its output.

<figure><img src="/images/wiki/star-tracker/image.png" alt="DLR slide showing how sensor models fit into an on-orbit servicing verification loop" loading="lazy" /><figcaption>Sensor models in the verification loop. Source: DLR, Tobias Kamp, iSpaRo 2026 presentation.</figcaption></figure>

The background facility is described in the [OOS-Sim paper (ICRA 2015)](https://ieeexplore.ieee.org/abstract/document/7139588). The mathematical foundation for star-based attitude estimation is [[wahbas-problem|Wahba’s problem and QUEST]].

## What the model includes

The model targets realistic **attitude measurements** and **measurement availability** while remaining fast enough for a real-time testbed.

| Requirement | Modeled behavior |
| --- | --- |
| Measurement noise | Correlated Gaussian noise and larger uncertainty about the boresight axis |
| Measurement outages | Sun, Earth, or Moon entering relevant visibility or avoidance regions |
| Star catalogue | Star directions based on a real catalogue |
| Adaptability | Configurable sampling rate, noise level, tracked-star count, and calibration parameters |
| Computation | Execution compatible with real-time simulation |

The abstraction omits image formation, detector noise, optical distortion, centroiding, and image-based star identification or tracking. It also leaves out higher-order reference-frame effects, nutation, aberration, and stellar proper motion.

The distinction matters: **selecting catalogue stars inside a field of view is not the same task as detecting and identifying stars in an image**.

## Model concept

<figure><img src="/images/wiki/star-tracker/image-1.png" alt="DLR model diagram with catalogue selection, coordinate transformation, noise injection, QUEST, and a separate in-FOV calculation" loading="lazy" /><figcaption>Two parallel paths: attitude determination and celestial-body visibility. Source: DLR presentation.</figcaption></figure>

The model receives the spacecraft’s true attitude and inertial position. These feed two related paths:

1. **Attitude determination:** select visible stars, transform their directions, inject noise, and solve for attitude.
2. **In-FOV calculation:** use the spacecraft geometry and an ephemeris model to check whether bright bodies enter relevant sensor regions.

### Attitude determination

The star catalogue supplies right ascension and declination, from which inertial star-direction vectors can be obtained. The true sensor orientation and field of view determine which stars are visible.

Selected inertial directions are transformed into the sensor/body frame and perturbed with measurement noise. The perturbed vectors and their catalogue counterparts then enter QUEST, an estimator for [[wahbas-problem|Wahba’s weighted attitude-fitting problem]].

With the frame convention $C_{bi}$ mapping inertial-frame vectors into the body frame, the objective is

$$
\min_{C_{bi}\in SO(3)} \frac{1}{2}
\sum_{k=1}^{N} a_k
\left\|\tilde{\mathbf{v}}_k^b-C_{bi}\mathbf{v}_k^i\right\|^2.
$$

The model provides an estimated attitude quaternion and an estimated attitude-error covariance. The superscripts $i$ and $b$ denote inertial and body coordinates; $a_k$ weights the reliability of each observation.

### Measurement availability

The ephemeris model supplies celestial-body positions over time. Together with spacecraft position and attitude, these support visibility checks for the **Moon, Sun, and Earth**.

<figure><img src="/images/wiki/star-tracker/image-2.png" alt="Star tracker field of view and avoidance-angle geometry from the DLR presentation" loading="lazy" /><figcaption>Field of view and avoidance angle serve different purposes. Source: DLR presentation.</figcaption></figure>

The field of view describes the region used to observe stars. An avoidance angle expresses how far the sensor should remain from a bright body. These checks can flag conditions in which star measurements become unavailable without rendering a complete detector image.

## Reported results

The presentation illustrates catalogue geometry using **Polaris and Ursa Minor**. Slowly rotating the tracker then demonstrates sampled attitude outputs and the larger attitude uncertainty associated with its boresight axis.

<figure><img src="/images/wiki/star-tracker/image-3.png" alt="Simulated Polaris and Ursa Minor star directions" loading="lazy" /><figcaption>Catalogue-based star geometry. Source: DLR presentation.</figcaption></figure>

<figure><img src="/images/wiki/star-tracker/image-4.png" alt="Attitude-estimation plots for a slowly rotating star tracker" loading="lazy" /><figcaption>Estimated attitude under slow rotation. Source: DLR presentation.</figcaption></figure>

<figure><img src="/images/wiki/star-tracker/image-5.png" alt="Attitude errors and estimated covariance showing star tracker noise characteristics" loading="lazy" /><figcaption>Attitude errors and covariance estimates. Source: DLR presentation.</figcaption></figure>

For the visibility example, the notes describe a full-Moon geometry and a rotating tracker, illustrating when the celestial-body flags change.

<figure><img src="/images/wiki/star-tracker/image-6.png" alt="In-field-of-view simulation results for celestial bodies during a tracker rotation" loading="lazy" /><figcaption>Celestial-body visibility during rotation. Source: DLR presentation.</figcaption></figure>

The implementation uses **Modelica** and exports through the **Functional Mock-up Interface (FMI)** for use in tools such as MATLAB/Simulink. My presentation notes record execution at roughly **30× real time in Modelica** and **24× in the Simulink FMU**. These are reported results for the authors’ setup; the hardware and timing protocol should be checked before using them as a benchmark.

## Takeaways

- Choose a model’s abstraction level around the experiment: a GNC verification loop may need credible attitude errors and outages without a full star-image pipeline.
- Preserve direction-dependent uncertainty rather than treating all attitude axes as equally noisy.
- Model availability alongside accuracy. Missing measurements can change estimator behavior even when nominal measurements are accurate.
- Distinguish assumptions supplied by the simulation, such as known star correspondences, from capabilities a real image-processing pipeline must recover.

## Sources and related notes

- Tobias Kamp and Marco De Stefano, *A Real-Time-Capable Star Tracker Sensor Model for Ground-Based Verification of On-Orbit Servicing Applications*, DLR, iSpaRo 2026 presentation. Names and presentation details follow the original study notes and slide attribution.
- [iSpaRo 2026 final programme](https://www.isairas-isparo.de/archiv/web/userfiles/isairas-isparo2026/261104_1136_i-SAIRAS_iSpaRo_2026_Final_Programme.html).
- [OOS-Sim: ground-based verification of on-orbit servicing](https://ieeexplore.ieee.org/abstract/document/7139588).
- [[wahbas-problem|Wahba’s problem and QUEST]] — the attitude-estimation foundation.

*These notes were originally written on November 16, 2026. A public preprint or implementation link was not recorded at that time; those links can be added when verified.*
