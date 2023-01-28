---
title: "KubeCon Barcelona Wrap-up"
pubDate: 2019-05-30
author: Elli Ludwigson
featuredImage: https://ddev.com/app/uploads/2019/05/KubeCon-group.jpg
categories:
  - Community
---

Last week in Barcelona the [Kubernetes](https://kubernetes.io/) and [Cloud Native](https://www.cncf.io/) communities gathered for [KubeCon](https://events.linuxfoundation.org/events/kubecon-cloudnativecon-europe-2019/) to learn from each other and collaborate on open source projects. We’ve been working hard to use the native features of Kubernetes to build our hosting platform, [DDEV-Live](https://ddev.com/ddev-live/), and we’re invested in contributing back to Kubernetes itself to strengthen and extend functionality for everyone. I asked our DDEV team members who attended for some highlights and a little background to introduce themselves. Meet Jason, Nic, and Jan!

### Jason:

**Could you tell us a little about yourself and your approach to your work?**

I’m a native Texan, frequent traveler, based in San Antonio. I’m passionate about bringing cloud native practices like observability, self healing and repeatability to the enterprise world. My philosophy is that if you can write down the process of operating a software system on paper in plain english, you can describe it in code!

**What’s your role with DDEV and how to does Kubernetes figure into that?**

I joined the DDEV team in January 2018 as a Cloud Architect for DDEV-Live. My initial focus was to implement a process for managing Kubernetes clusters in AWS, along with a full monitoring stack, networking and storage add-ons.

I later became more involved in the software development side of DDEV-Live, and eventually took on the role of engineering lead. Since then, I realized that our existing implementation of the platform had gotten us far, but we wanted to add several fundamental architectural features to meet the needs of our community.

Kubernetes at its core is not really just about container orchestration, but a set of design principles. A declarative API, which uses abstract vocabulary to describe computing concepts, combined with an event driven, eventually consistent controller pattern is why Kubernetes won the container orchestrator war. DDEV-Live is a platform which does not focus on hacking together older tools in an effort to force them to work in a cloud native environment, but rather implementing Kube-native APIs to describe the process of operating PHP Sites. As Kubernetes matures, we are able to learn and develop DDEV-Live along with it, so that now we are effectively extending Kubernetes.

**What is your history with Kubernetes and KubeCon?**

This is my third KubeCon and my first time to attend it in Europe. I got introduced to Kubernetes for the first time at [OSCON back in 2015 at the 1.0 launch in Portland](https://conferences.oreilly.com/oscon/open-source-2015/public/schedule/detail/45281). I could already see its potential as the revolution we had needed in managing cloud technology. I have been using Kubernetes now for over 2 years to orchestrate containers in production.

Over the last 6 months, my focus has shifted more from using Kubernetes to extending Kubernetes. Some of my contributions so far have been to Kube Ecosystem projects such as [AlertManager](https://prometheus.io/docs/alerting/alertmanager/) and [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/). I am looking to get further involved with the Kubernetes SIGs, which are special interest groups who focus on certain topic areas of the platform such as Instrumentation and MultiCluster.

We’ve also had a lot of interest for the new [Drupal/Kubernetes SIG](https://github.com/drud/sig-drupal), where we’re starting to collaborate on creating reusable patterns that will support everyone working with Kubernetes in the Drupal community. It’s been interesting to hear how others are approaching similar problems to what we’ve seen and to combine our efforts to help builders get started more quickly in the future.

**What sessions at KubeCon really struck your interest?![Nic and Jason at KubeCon](https://ddev.com/app/uploads/2019/05/KubeCon-Nic-Jason-1024x768.jpg)**

Mo Khan gave a really good deep dive session into the [inner workings of the Kube-API](https://www.youtube.com/watch?v=-2xcNjKLU9E&list=PLj6h78yzYM2PpmMAnvpvsnR4c27wJePh3&index=249&t=0s), focusing on how authentication and authorization works, and how it could be extended. This is an area I have already been developing in and I am grateful to have gotten the chance to talk to Mo and other contributors about this rather obscure area of Kubernetes.

Jason DeTiberus and Hardik Dodiya gave a great presentation over the architecture and goals of the [Cluster and Machine APIs](https://www.youtube.com/watch?v=Mtg8jygK3Hs&list=PLj6h78yzYM2PpmMAnvpvsnR4c27wJePh3&index=291&t=0s). These APIs are key to being able to use a Kube control plane to manage Kubernetes clusters. Kubernetes to manage Kubernetes? Pretty cool right? The development of APIs like this further a prediction that I share with others that the control plane pattern of Kubernetes will live on long after containers are replaced by something else.

**What else about the event would you like to highlight?**

This KubeCon was really unique for me in that it reinforced how diverse and powerful the cloud native community really is, and that this is a global effort. There were far more tracks that were oriented towards contributors looking to extend Kubernetes, rather than it overly being an avenue for vendors to showcase their Kubernetes products, talk about service meshes or running stateful sets.

I was able to connect directly with several Kubernetes SIGs that I am planning to be more involved with, [api-machinery](https://github.com/kubernetes/community/tree/master/sig-api-machinery) and [cluster lifecycle](https://github.com/kubernetes/community/tree/master/sig-cluster-lifecycle) in particular. The maintainers in these SIGs are always looking for help, so I have several issues in the apiserver-builder and controller-runtime that I plan to work on and offer pull requests for this summer.

### Nic:

**Please tell us a bit about yourself.**

Hi, my name is Nic and I originally joined the DDEV team as an intern while I finished the last semester of my B.S. in Computer Science at the University of Texas at San Antonio (I actually graduated the day before heading to KubeCon!). I aspire to grow into a Site Reliability Engineer (SRE) and/or Platform Architect in the Cloud/Kubernetes space. I’m always hungry for knowledge, and my coworkers can definitely confirm that I ask a massive amount of questions on a regular basis.

**What’s your role with DDEV and how does Kubernetes figure into that?**

I am currently a Software Developer, having joined DDEV in December 2018\. I work with my fellow hosting team engineers to build the next iteration of our Kubernetes-native hosting platform: DDEV-Live. Kubernetes and its ecosystem is where I do my day-to-day work, and have had the opportunity to be exposed to, learn, and develop in a wide slew of different areas within this ecosystem. These areas include platform API and Operator development, monitoring, logging, CI/CD, and testing.

**What is your history with Kubernetes and KubeCon?**

This is my second Kubecon. I previously went to Kubecon Austin in December 2017 where I got my first true exposure to Kubernetes and the cloud-native community. Since then, I can’t begin to describe how much I’ve learned about Kubernetes. My latest big project outside of my work on DDEV-Live was an automated Kubernetes microservice testing project I had to develop as a research assistant for a Ph.D research project during my last semester of college. During this time I was also working with DDEV full time, and was able to directly apply what I learned at work to this research-oriented work.

**![Nic at KubeCon](https://ddev.com/app/uploads/2019/05/KubeCon-Nic-768x1024.jpg)**

**What sessions at KubeCon really struck your interest?**

[Scavenging for Reusable Code in the Kubernetes Codebase – Kevin Lingerfelt](https://www.youtube.com/watch?v=G8swjziYjY8&list=PLj6h78yzYM2PpmMAnvpvsnR4c27wJePh3&index=117&t=0s)

It was insightful to get a practical example of something that I have been doing since day one with DDEV, so learning a few tips and tricks throughout this talk only improved my ability to find and implement new and exciting ideas and concepts.

[How to Create Kubernetes Experts – Clarke Vennerbeck & Aaron Teague](https://www.youtube.com/watch?v=n6VPBUIkgqo&list=PLj6h78yzYM2PpmMAnvpvsnR4c27wJePh3&index=296&t=0s)

As a newcomer to the professional world of I.T. and I.S. this talk relayed to me a few key points that I should keep in the back of my mind during my journey along this road.

**What else about the event would you like to highlight?**

It was honestly surprising to see the amount of progress in the Kubernetes ecosystem compared to the last Kubecon I attended in December 2017\. It seems now that the shift in industry use of Kubernetes has gone from working within the pre-defined boundaries of core Kubernetes to now creating custom extensions of Kubernetes concepts like custom API servers, and custom resource definitions (CRDs), along with the controllers and operators that are used to define and execute the logic for these custom resources.

We on the DDEV team have already started this journey as we built this iteration of DDEV-Live, so to be able to expand my existing knowledge through going to these talks was an invaluable experience. To add to this, talking to vendors in the vendor hall also gave me advantageous insight into the present state of the Kubernetes and Cloud Native business landscape.

### Jan:

**Please tell us a bit about yourself and your role with DDEV.**

I am yet another engineer trying to automate repetitive and mundane operations tasks, breaking as few things as possible along the way. I’m a Site Reliability Engineer, and so I spend my time writing, deploying and breaking Kubernetes operators.

**What is your history with Kubernetes or KubeCon?**

I have contributed to both [Kubernetes and OpenShift](https://github.com/wozniakjan).

**What sessions at KubeCon really struck your interest?**

[The Kubernetes Control Plane for Busy People Who Like Pictures – Daniel Smith](https://www.youtube.com/watch?v=zCXiXKMqnuE&list=PLj6h78yzYM2PpmMAnvpvsnR4c27wJePh3&index=96&t=0s)

Inspiring insight into how people at Google design their Kubernetes controllers and operators, and how they split really complicated problems into simpler sub-problems.

[Kubernetes Failure Stories and How to Crash Your Clusters – Henning Jacobs](https://www.youtube.com/watch?v=6sDTB4eV4F8&list=PLj6h78yzYM2PpmMAnvpvsnR4c27wJePh3&index=31&t=0s)

Failure stories and most importantly how to recover and plan for preventing those are always very valuable. It’s also pleasant to hear and reassuring that other people break things too.

**Any final Kubernetes thoughts?**

Kubernetes growth is unprecedented. This software really helps with sore spots probably every modern company has been dealing with. It’s been remarkable being along for this ride!

### Thank you KubeCon!

Open source engagement in the communities around the software we use is central to our mission with DDEV. KubeCon was a really good opportunity to hear from others and have conversations about how we can work together to continue extending Kubernetes and the projects we build with it. Thank you to the presenters, organizers, and folks we got a chance to connect with!
