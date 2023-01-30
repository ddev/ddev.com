---
title: "Why an easy start is important to teaching web development"
pubDate: 2021-01-21
author: Elli Ludwigson
featureImage:
  src: https://ddev.com/app/uploads/2021/01/40629336923_4f79c53b93_c.jpg
  alt:
  caption: Photo of Mauricio Dinarte at DrupalCon Seattle contribution day in 2019.
  credit: [Josef Kruckenberg @dasjo](https://flic.kr/p/24UgYn2)
categories:
  - Community
  - DevOps
---

It’s always a joy when the planets align and connections are made! After the virtual [DrupalCon Europe](https://events.drupal.org/europe2020) in December a few folks caught up on social Zoom, where I learned that a couple of my longtime friends in the Drupal community are using [DDEV-Local](https://ddev.com/ddev-local/) to teach web development to newcomers.

Mauricio Dinarte was one of my first mentors when I started learning Drupal in 2013, so it was an honor to interview him for this blog. [Mauricio](https://www.drupal.org/u/dinarcon), aka [dinarcon](https://twitter.com/dinarcon), has been doing Drupal for a decade now and teaching Drupal for half that time locally in Nicaragua as well as at Drupal Camps and Cons worldwide. This is the first blog in a set, please read more about [teaching Drupal in Iceland from Hilmar Hallbjörnsson](https://ddev.com/ddev-local/why-standardization-is-important-to-teaching-web-development/).

### What do you teach attendees about Drupal and React and what are some of the challenges in getting them started?

I teach [Drupal site building](https://agaric.coop/training/getting-started-drupal-9), [Drupal migrations](https://agaric.coop/training/drupal-content-migrations), [Drupal upgrades](https://agaric.coop/training/upgrading-drupal-using-migrate-api), and [ReactJS basics](https://agaric.coop/training/getting-started-reactjs). I present sessions at events, which are a lecture style, and workshops going over specific examples and hands-on exercises. That has been quite different when they used to be in person versus now that they are online. Before, you were able to see someone had an issue, sit next to them and try to work together out of the problem. But now it’s mostly online and depending on the size of the class, it’s not possible to let the attendees screen share. So that is a challenge.

Sometimes the setup is as simple as sending over links to repositories and lessons. Sometimes it’s using the [quick start command in Drupal](https://www.drupal.org/docs/installing-drupal/drupal-quick-start-command) or something like [DrupalVM](https://www.drupalvm.com/) or [DDEV](https://github.com/drud/ddev#ddev) for more advanced classes. In all scenarios, no matter what the topic is, I strive for keeping it very, very simple in terms of the [local development environment](https://github.com/dinarcon/drupal%5Fmigrations%5Fbasic/blob/main/DEVELOPMENT.md). It is not always possible, but that’s something that I really look for: some way in which there is the least amount of effort from getting started to having a functional site and, depending on the course, writing the first line of code.

### How are you supporting students and adjusting to fit a more virtual, online format?

About two weeks ago, I gave a presentation on [layout builder](https://www.drupal.org/docs/8/core/modules/layout-builder) to a small group. We were using [MAMP](https://www.mamp.info/) and [Pantheon environments](https://pantheon.io/trainers) to deploy, because it was not about explaining everything but just the essence of the tool. With some set up in advance I was able to start the training, so that was right for this instance. But in general, with online trainings, there have been a lot of challenges. Funny enough, most of the challenges go back to what I was describing – the local development environment.

For example, along with my colleagues at [Agaric](https://agaric.coop), in 2020 we presented three or four different [online workshops](https://agaric.coop/training). We would spend hours, and hours, and hours giving people support ahead of the training to get their local environments ready. We have seen so many different setups, every computer is different. It can get complicated. That is why we offer office hours before the trainings to help people get ready. We also offer training recordings so everyone can practice later. Again, the key is having a simple set up with a local environment to begin with.

### That goal of having quick wins when getting started coding sounds similar to our work with [Drupal contribution mentoring](https://www.drupal.org/community/mentoring)!

Yeah, requiring the least amount of effort to get started is ideal — because in the context of mentoring, people want to contribute to Drupal as an open source project, and in the context of a training they want to learn a new skill. They don’t necessarily want to learn Docker, Composer, LAMP stacks, or virtual machines to be able to contribute. That’s why, depending on the topic and issue I choose the development tools that meet the minimum requirements to get them started.

### How do you determine which development tools are best for Drupal migrations or getting started or… ?

These have changed over the years. When I started presenting the Drupal workshop back in the day as part of the [global training days program](https://groups.drupal.org/global-training-days), I used [simplytest.me](https://simplytest.me/), an online tool for installing Drupal. Back then the installation would only be available for two or three hours. I remember talking with [Patrick Drotleff](https://www.drupal.org/u/patrickd), the creator of the tool, when he was extending the lifespan of temporary sites to about 24 hours. This allowed us to give a full day training using simplytest.me alone.

Before that, we would spend two of the three hours just trying to get an \*AMP stack on each person’s computer. It was inefficient and frustrating. That’s the friction that we wanted to avoid – people want to learn something new and then they discover that they need to learn twenty other things to be able to start being productive.

Later, I started using Pantheon for the Drupal site building courses, because they have the free tier with no time limits. Pantheon also has a program called [Pantheon for Educators](https://pantheon.io/trainers) where trainers like me can create environments on behalf of their students in advance. On the day of the training, we jump directly into the content, we don’t need to worry about “Do you have LAMP stack on your computer?”

For Drupal Migrations it’s a little bit different because we know we need more setup than just an out-of-the-box Drupal installation on Pantheon. Some modules need to be installed via composer. Depending on how the Pantheon site is set up, this might require configuring SSH keys . To keep things simple, I default to the Drupal quick start command. That uses the built-in PHP Web Server, SQL lite, and PHP itself. With that you can [get a Drupal installation in five to 10 minutes](https://github.com/dinarcon/drupal%5Fmigrations%5Fbasic/blob/main/DEVELOPMENT.md). That does require a little bit of technical knowledge and having PHP and Composer installed on your computer.

As a part of [UnderstandDrupal.com](https://understanddrupal.com/) I recently released a [Drupal Migration training](https://understanddrupal.com/migrations). In the lecture on debugging migrations I use DDEV because it’s very simple to [install DDEV and to configure Xdebug](https://ddev.com/ddev-local/ddev-local-phpstorm-and-xdebug-debugging/), so that was kind of the selling point. It was literally just issuing a command, setting a breakpoint, and allowing the IDE to listen for connections. And that was it.

Before DDEV I was using DrupalVM for many years. It works great if you have VirtualBox, Vagrant, and Ansible installed in your machine. But getting them properly configured in the first place can be challenging in some environments. So, you need to make a decision: to install VirtualBox or Docker. Attendees might come to a training with [Windows, Linux, Mac](https://ddev.readthedocs.io/en/stable/#system-requirements). Sometimes they do not have admin privileges on that machine. I have fought many of those battles. And I don’t consider myself a sysadmin! So the simpler the tool, the better for me. That’s basically why I chose DDEV.

### Tell me a little more about your experience using DDEV for local development? What was especially useful or lacking?

Definitely useful how easy it is to configure Xdebug. Coming from DrupalVM I was really looking forward to how to debug, which works out of the box. But the highlight of DDEV is [Randy Fay](https://ddev.com/author/rfay/)! I post a question in the [#ddev Slack channel](https://ddev.readthedocs.io/en/stable/#support-and-user-contributed-documentation) and he answers within minutes! Sometimes I just lurk in the channel to learn from others. Randy is so good at offering support, not only on a technical level. He also takes the time to explain how things work. That is a big asset for DDEV, you know, having someone who is able to offer support in a timely, kind, and humane way.

The only thing, which isn’t specific to DDEV, is that in order to get the local environment working you need Docker installed. That might be a challenge in itself. For example, two days ago, I was working with a client who was having problems with the DDEV installation. And the reason was because they had just updated Docker desktop and that broke things. Of course the [system requirements](https://ddev.readthedocs.io/en/stable/#system-requirements) are in the docs, but sometimes people update their tools as soon as new releases are available without checking compatibility.

### What are the needs and goals of the students who sign up for Drupal web development trainings? Who are they?

Recently in my local community we noticed when we promoted the training as “Get started with Drupal” people didn’t know what Drupal was. So we switched the name to “How to build a website in a day” and got much more interest. We’re often teaching small business owners how to build a simple website for their business. While covering ecommerce integration is not feasible, we teach them how to build a product catalog in a day.

We have also given many sessions and trainings to university students majoring in computer science and design. The course is always tailored to the audience. So we talk about theming, reusable components, and modules to highlight Drupal’s flexibility and provide foundational knowledge. Sometimes we have attendees in leadership roles, or project managers, who come to a training to understand the bigger picture. They want a sense of the tools, what is possible, what is recommended so they can be a bridge between developers and stakeholders.

For the Drupal migrations trainings, that audience is varied. Sometimes they’re the one technical person in the organization who has been tasked with doing the update. The introductory course is friendly to just about anyone since it only requires understanding of site building concepts like nodes and users. Intermediate and advanced migration courses require some programming knowledge, but provide detailed instructions and examples as necessary. They may also obtain Drupal upgrade training which does require more PHP knowledge and a more complex local environment setup. Getting the two versions of Drupal talking to each other is when people start to lean on our support and office hours. Sometimes attendees just need to solve a specific problem, and that is again when we need to get them started with as little friction as possible.

Some audiences benefit more significantly from migration trainings. For example, universities or governments who have hundreds of sites: They learn once and apply the knowledge multiple times.

### What are your teaching goals for 2021?

I want to expand [UnderstandDrupal.com](https://understanddrupal.com/) to a teaching platform with more resources in text and video format. Different people learn in different ways to it makes sense to offer both options. Additionally, a goald I really hope I can accomplish in 2021 is to translate the material to other languages. One of the primary goals of UnderstandDrupal.com is to make the content accessible to as many people as possible. As someone who is not a native English speaker, I know the language barrier can be very high. I started translating to Spanish and French myself. I couldn’t keep up with that, but I will try again this year.

### I love what you said about the scaling and cascading effect of an impactful training for the right attendees. Why did you get into teaching?

Going back to study groups in school, I liked that experience of learning together. It made us more efficient, made the process accountable. Now, in my day-to-day professional experience, teaching has made me a better developer, and has allowed me to learn a lot more about the subjects I teach. If I weren’t a developer, I would probably be a teacher.

For example, in 2019, I wrote a [series of articles about Drupal migrations](https://understanddrupal.com/31-days-of-migrations) for UnderstandDrupal.com which I consider the pinnacle of my Drupal contributions to date. It was 31 days straight trying to write a technical article every day. It seemed so reasonable at the beginning, but I was proven wrong early on. It could take up to eight hours to write an article. One of them took me 20 hours because I had to do a lot of research, debugging, and testing. So producing the series exaggerated all the benefits and all the difficulties in teaching and producing content.

I learned so much. Before I started writing that series, I had been doing migrations maybe for three years. I thought I knew enough to be brave and make that public commitment. By writing articles I think that my knowledge doubled or tripled in just that month, because I was so heads down into the topic., I would spend hours in the debugger stepping through the migrate API code, understanding, or trying to understand, how it worked.

I teach because I enjoy it, I like sharing my knowledge. When I started my journey, I didn’t know of the Drupal community. For me, Drupal was a tool that allowed me to build a website without knowing a lot of HTML or CSS. It was probably six months later that I encountered my local community at a meetup. In five minutes, someone would answer what had taken me weeks, or months to investigate. So that’s why I teach, to be able to help others, save them time, and hopefully save them frustration.

## Where to find Mauricio

The [Drupal Nicaragua community](https://www.drupalnicaragua.org/) can be found in many places, including [groups.drupal.org](https://groups.drupal.org/nicaragua), [Facebook](https://www.facebook.com/pg/drupalni) and [Twitter](https://twitter.com/drupalni).

[UnderstandDrupal.com](https://understanddrupal.com/) is Mauricio’s own site and project with pre-recorded courses on[ Drupal Migrations](https://understanddrupal.com/migrations) and [ReactJS](https://understanddrupal.com/reactjs). Much of the material is free and [open source](https://github.com/dinarcon/). When you sign up for [a virtual training](https://agaric.coop/training) you get the additional benefit of live explanations, lectures, and hands-on help with set up and questions. Please support Mauricio via one of the sponsorship links on the [site](https://understanddrupal.com)!

[Get started with Drupal and DDEV](https://ddev.com/get-started/)
