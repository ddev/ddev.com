---
title: "Developer Happiness: Use the Right Tools to Avoid Burnout"
pubDate: 2018-04-09
author: Heather McNamee
featuredImage: https://ddev.com/app/uploads/2018/04/toolbox-2645700_1920-e1523274374612.jpg
categories:
  - DevOps
---

We recently spoke with [Ryan Blyth](https://newmediadenver.com/team/ryan-blyth/), Technical Project Manager at [NEWMEDIA](https://newmediadenver.com/about/) here in Denver, Colorado. Ryan candidly shared the stresses of the web development with us and how using the right tools for the job can make you a much happier developer. Rather than the tools accommodating the way he works, Ryan often found he was organizing his day around the way his tools worked.

DDEV was spun out of NEWMEDIA in 2016\. It’s is the agency where DDEV’s founders developed and solidified many of the best practices baked into the services and tools we now offer as DDEV.

### The ‘Developer Happiness’ factor

More and more developers are talking about the effects of burnout from a lack of balance between work and life. The negative effects of impossibly tight deadlines and constantly shifting toolsets make web development a difficult job. The daily interruptions pile up from broken development environments to the mysterious bugs that multiply when you collaborate. CareerCast polled readers to find the most stressful jobs in the tech industry, and [number one on the list](https://www.cio.com/article/3030171/careers-staffing/the-8-most-stressful-jobs-in-tech.html) was “web developer.”

Like physical health, mental health isn’t something you only manage when you’re in crisis or when it becomes an illness. It is something you can maintain as a matter of daily practice.

[OSMI](https://osmihelp.org/) (Open Sourcing Mental Illness) is a campaign to change how we talk about mental health in the tech community. Of the over 1400 respondents to their [most recently published survey ](https://osmi.typeform.com/report/Ao6BTw/U76z)81% were employed, many in small companies. Among those who reported, less than 30% of their employers discuss mental health, and it’s not clear that many have practices in place to promote positive mental well-being. Considering that, it’s apparently a problem that needs to be addressed because 71% of respondents said their productivity is affected by mental health issues.

CEOs are recognizing the importance of mental health, too. Olark CEO, Ben Congleton [points out](https://medium.com/@OlarkLiveChat/its-2017-and-mental-health-is-still-an-issue-in-the-workplace-61efbef092f), “We are in a knowledge economy. Our jobs require us to execute at peak mental performance. When an athlete is injured they sit on the bench and recover. Let’s get rid of the idea that somehow the brain is different.”

Ken Mugrage, [in his presentation at DevOps Days](https://www.youtube.com/watch?v=qN4Mj7B1IV0), talked about how using “the right technology and the right tools for the team,” within a DevOps culture can help eliminate wasted time and energy and reduce the risk of burnout, too.

### Finding the right tools for the job

The [“task-technology fit” theory](https://www.jstor.org/stable/249668) states that when there’s a good fit between technology and the tasks, you’ll have better performance in completing tasks. Using the right tools for the job could make all the difference writes [Nick Larsen at Stack Overflow](https://stackoverflow.blog/2017/10/20/developer-happiness-right-tools-job/): “Your developer happiness is unquestionably directly proportional to the ease of the tools you have to accomplish your task.”

Rick Manelius, Chief Product Officer found these same frustrations working in a digital agency. Rick said “Before using DDEV, every request, even the ‘it’ll just take 2 minutes’ ones came with it the anxiety of buffering for the work before the work… that is, just getting the site pulled down and ready to start the actual task of development. During times where a lot of projects were in flight, this would result in a considerable amount of mental bandwidth exerted trying to queue them all up.” Eliminating those frustrations is what motivates the DDEV Team.

This echoes the experience many developers can relate to. Rather than the tools accommodating the way he wants to work, Ryan at NEWMEDIA often found himself organizing his day around the way his tools worked. Ryan described his development workflow before using [DDEV Local](https://ddev.ddev.com), and what was going through his mind as he’d ready himself to work on a project.

Ryan explained how he’d start setting up without knowing the specifics of any particular project, because he knew setting up could take some time. He’d try to make use of the waiting time to plan. “I built a mental model of what I was going to do,” Ryan would read tickets and related threads and plan what he’d work on. Things didn’t always work out. If he’d come back to discover the local environment wasn’t working, he’d be frustrated, “Because I had a plan and now that went out the window.”

Ryan recounted the times he’d run into issues that could easily be solved with consistent development environments. The frustrations could pile up through the day. “If this happens a few times during the day, you start to feel like you’re not getting anything done. And when you feel like you feel like you’re not getting anything done, you’re going to blame it on your tools.”

And if you’re not blaming it on the tools, you might be blaming it on other people. Better tooling and a consistent environment means you can improve communication within your team and with external contractors.

What he tries to do is eliminate “as many unknown variables as possible, so you can have a productive conversation, instead of a circular conversation.” He likes knowing the state of the projects he’s running, “I want to know, can I leave these projects running, are they going to use up resources?” He wants to quickly know the state of the project and details like the development URL. For example, with [\`ddev list\`](https://ddev.readthedocs.io/en/latest/users/cli-usage/#listing-project-information) developers can see the state of any projects running with DDEV Local.

Having tools that work as fast as your thought processes will make your workflow more smoother and you can avoid wasted time. And if you’re working longer hours to make up for lost productivity, the lack of rest or vacation time can [lead to web developer burnout](http://devopsagenda.techtarget.com/opinion/Undercapitalization-is-the-disease-developer-burnout-the-symptom).

### Eliminating the deployment fear factor

Ryan said there’s a definite pre-deployment fear that many developers are familiar with. Depending on the host, the complexities increase, “It’s not so much the initial deployment, it’s the iterations … Deploying is never as simple as it seems.”

Many of these fears are around the security and reliability of the applications they deploy. He suspected many time people deploy sites that don’t understand security vulnerabilities.

“There’s a pain and fear associated with deployment and I don’t think you know what it is unless you feel it on a daily basis.” Ryan explained that if you have any doubts about something you did that day, “It sticks with you, it may stay with you into the night. And you come in the next day and double check things.” That unease becomes the mental bandwidth that can’t be allocated to the next task. You’re still wondering if you did the last task right.

Having the right tools for the job can help. Ryan said, “You want to know that what you’re doing along each step is the correct thing to do. Ideally, you want it abstracted away, so it just works.”

When we hear from customers and DDEV users, they often talk about benefits of time-saving and efficiency, but there are other factors. “You cannot understate happiness in all this.” Ryan appreciates being able to get feedback from DDEV at every step of the workflow that he’s done things correctly, that he hasn’t introduced a vulnerability, “I’m not guessing at technology that I don’t fully understand. I want good feedback telling me ‘you’re doing the right things’ to eliminate as much of that fear as possible.”

That’s what we’ve been doing as we build our dev-to-deploy suite of DDEV tools. We keep on top of new developments and security concerns and use that to inform how we build the tools so they work reliably. We aggregate all that information and apply best practices in the tool. Our platform is the industry standard open source technologies, distilled best practices, all glued together with our extensive agency, CMS, and DevOps experience. We hope knowing all of that is on your side gives you the peace of mind to on what matters.

**[Get started with DDEV-Local](/get-started/)**

Photo credit: CC0 Creative Commons Repair Tools [Vinayr16](https://pixabay.com/en/toolbox-socket-repair-tool-2645700/)
