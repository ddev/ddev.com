---
title: "Using DDEV to Teach Open Source Web Development"
pubDate: 2019-02-26
author: Heather McNamee
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2019/02/jantine-doornbos-711322-unsplash-e1551235015756.jpg
categories:
  - DDEV
---

When I heard that Oliver Hader, a [TYPO3 CMS](https://typo3.org/) core developer, was using DDEV-Local to teach web development to university students, I wanted to know more. So I sat down with him to find out about the course, his students, and how DDEV helps. It’s great to see students working with professional tools to learn industry-relevant skills.

For more updates from the DDEV community, join our mailing list.

[Join Newsletter](http://eepurl.com/dlqkUD)

Oliver Hader lives in Bavaria, Germany. “Fifty percent of the time I work for [TYPO3 GmbH](https://typo3.com) as a core developer, doing research and development. I keep up with new developments and see how we can include and support them in TYPO3\. I also took over being the Security Team Lead at the beginning of this year. The other fifty percent of my time, I’m self-employed, working for web agencies with JavaScript development and frameworks like Angular or Polymer. I also do some consulting in software architecture on how to build flexible applications that are scalable on cloud services. So my work is a mix between consulting and development.”

Oliver is motivated by his own experience as a student, even considering his busy schedule. “The teaching is another 10% on top of my schedule, which means a lot of preparation and feedback happens at the weekends. So this is 105%-110%. 🙂 I think it’s a good thing to pass on knowledge that you’ve collected, especially to let others know how they can improve make use of new technologies. I realized from my previous time of being a student, we felt ‘If we had known that earlier, it would have helped us a lot.’”

He brings his professional experience and aims to create a collaborative atmosphere in the course. “I don’t treat students as students, I try to treat them as new colleagues in a company.”

### Helping students gain professional skills

“My students are part of a Masters program called Software Engineering and Industrial Applications.” Students come to take this course from all over the world, from North America, the Indian Subcontinent, and Africa. They all have bachelor degrees, but they don’t need to be computer science majors. “Some did electronic engineering, so web development and how it works is new to them. Others have worked with WordPress or other CMSs before. So it’s interesting to see how they interact with each other.”

Oliver teaches the course during the winter semester. The module includes 45 hours of in-classroom contact time and 105 hours of self-directed project work. The contact time is divided between lectures in the morning and hands-on practical instruction in the lab in the afternoon.

They work on projects around content management, which fits well with their overall degree goals of learning software design principles. “They have to think in containers, packages, and reusable components. And a content management system qualifies quite well for that because you also find these patterns in a CMS.”

Since the coursework is project-based, there’s no final exam. For their grade, students complete a project and document their approach. “They write about what went wrong and what went well, design patterns, and their initial plan of what they wanted to achieve.”

In the process, they create extensions, build websites and applications. That’s how they’re assessed. “If they created cool software, that’s a good thing. If the application is complex enough, that’s a good thing … It’s really focused on practical work, and not just learning for one exam and forgetting everything.”

“I get them to work as a team, in groups of 4-5 people, rather than taking a teacher/student approach. When I get feedback from students, they tell me they like this practical approach, especially the aspects of collaboration. They learn how to work together.”

“I appreciate that because it’s what I wanted to achieve. I don’t want to treat students as students but as my colleagues. I want to help them be successful with the project and the challenge they have to solve.”

### Consistent web development environments help teachers

Before DDEV came along, Oliver tried to find a reliable solution to help students set up a local development environment. When he first tried plain Docker there were known issues with Windows, which meant it wasn’t working well. So he set up VirtualBox for his students to use. It promised a consistent environment. “That’s something I really wanted to have: that all the plugins packages and software that is installed are the same. For example, this would include the proper PHP version, PHP & web server modules, virtual host configuration, ImageMagick, Node.js, and so forth.”

“The sad thing is, whenever I made a mistake (and I make a lot of mistakes!) such as forgetting to configure packages, forgetting to figure out if image generation or PDF is working, it was difficult to make improvements and distribute them. I had to distribute a 4GB file on a USB stick.”

It seemed like there had to be a better way to do it. “DDEV eases the pain of using Docker,” though the students were struggling with limited hardware resources. Considering that, Oliver said, “It’s easier now to use DDEV, it works well for the TYPO3 environment.”

The biggest advantage comes from using containers. “That’s something I really wanted to have,” consistent environments means it’s easier to troubleshoot. “All the software and plugins are the same for everyone. If someone has an error we’re talking about the same environment.”

“Using DDEV it’s pretty easy to use a full blown web application. Everything that’s required is defined in that DDEV container. And I can continue evaluating their projects.” For teachers looking at how to ease the pain of [setting local development environments for newcomers](https://ddev.com/ddev-live/removing-the-biggest-barrier-to-contribution/), that is really great to hear.

“The good thing about using DDEV is that the students can share their projects very easily. They have the .ddev configuration file and they are using PHP Composer where they can define the package states of the extensions. This means, whenever there’s a problem or they have a question on their application, I can check out that repository, and give them feedback to solve the problem.”

### Using open source – the software and the community

The students are getting a taste of what it’s like to work in open source, but it’s still a challenge. “I realized my students were really shy. They would try and solve problems on their own. I had to remind them that there’s an open source community behind what they are using. There’s a TYPO3 OSS community. You can ask the community. You can make use of any extensions available.”

Giving students industry-standard professional tools and exposing them to open source communities is a win-win for employability and skills that will set them up for life.

We love to hear stories about how you’re using DDEV. Are you using DDEV for teaching or training? Say hi to us on Twitter and tell us!

[Tweet to @drud](https://twitter.com/intent/tweet?screen%5Fname=drud&ref%5Fsrc=twsrc%5Etfw)

### Try out DDEV for yourself

We have quickstart documentation for major CMSs and you can use DDEV to run other types of projects as well.

[Try DDEV](https://ddev.readthedocs.io/en/latest/)

Photo by [Jantine Doornbos](https://unsplash.com/photos/xt9tb6oa42o?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)
