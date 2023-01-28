---
title: "DDEV: It does what it says on the tin"
pubDate: 2018-04-24
author: Jeffrey A. McGuire
featuredImage: https://ddev.com/app/uploads/2018/04/alex-burrows-drupal-mentoring.jpg
categories:
  - DDEV
---

![](https://ddev.com/app/uploads/2018/04/alex-burrows-300x300.jpg)

I recently spoke with Alex Burrows, CTO of the [Digidrop agency](https://digidrop.io/), based in Surrey, UK. After Alex started using DDEV, he found it was saving him time and reducing stress. It wasn’t long before he was convincing his colleagues and clients to use DDEV, too. He and his team have been happy with the switch. They’re getting their client work done faster and Alex reports that it’s also speeding up their pre-sales and discovery processes with potential new clients. Alex sums up how straightforward using DDEV is and how it meets his needs with the old UK saying, “It does what it says on the tin.”

Since Alex has started using DDEV, we’ve been bowled over by his support and enthusiasm. We were curious to hear from a power user and trainer about what advice or tips he offers to newcomers.

His main advice for using DDEV? “Just [read the documentation](https://ddev.readthedocs.io/en/latest/). It’s a simple process.” He said, “If you’re looking for an environment that’s gonna make your life easier, and allow you to spin up sites very quickly – then DDEV’s the solution to go for.”

### Considering alternatives for local development

Alex leads a team of two developers in-house and works with another ten developers offshore. “I lead all the development in our agency. I decide how the solution architecture is devised and how we execute it.”

One of his colleagues is an apprentice–a government-supported job-placement system in the UK that gives recruits industry experience, a paid job, all while earning a qualification. New developers are constantly learning. “As part of the [Drupal Apprentice](http://www.drupalapprentice.uk/) scheme, I do onsite and office training sessions.” With his own team at work, Alex is their mentor as well as the lead developer. “We go through the best approach and ‘The Drupal Way’ so they understand how to build things.”

Because he’s overseeing his team’s work, he switches between 3-4 different projects in a typical day. He helps solve problems and he works on any of the more complicated code that goes into these projects.

“With Vagrant it would take so long to do anything, and you’d have problems left, right, and center.” So he began to look for a Drupal VM alternative. “I needed something I can get up quick. Instead of sticking Vagrant up and going to make a cup of tea, then coming back and it almost being finished.” For a time, he said, “Vagrant was the go-to, and then Docker came out, and everyone started moving to Docker.”

He tried out building Drupal containers in Docker, then Docker4Drupal, but he felt it didn’t suit his needs. “I wanted something quick and easy. And it required a lot of explanation.” He had also tried other local development environments such as Acquia Dev Desktop and MAMP. “There are many configurations I don’t want to touch, and with many of the alternatives, it seems it was the only way to do it.”

He couldn’t find a quick solution, “… That is, until DDEV. You can have an environment up in seconds, compared to 20 mins,” or more using a virtual machine. He was inspired to try DDEV after seeing his friend Richard Sheppard demo DDEV at [North West Drupal User Group](https://nwdrupal.org.uk/).

### DDEV – it does what it says on the tin

Alex was impressed with what he saw and went back to try it out. “You start by typing `ddev config`, and you answer three questions: the site name, the location of the site root, and then the type of project, if it’s Drupal, PHP, WordPress.” Hey presto, you have a setup! DDEV was straightforward, and exactly what he was looking for.

He likes that he can use DDEV as his development environment with many frameworks and for all client projects. “You’re not restricted to Drupal, for example with Acquia Dev Desktop. You could actually decide to write something in Symfony and not touch Drupal. Just enter PHP in the configuration step to specify the Application Type.”

Alex likes that you can get direct access to the DDEV team, for example through Stack Overflow ([see questions tagged DDEV](https://stackoverflow.com/questions/tagged/ddev)). Alex said “There are no cons I’ve come across. And the fact that it’s open source, it means if there is a feature we want added in, we can submit a PR.” He hinted he’s working on a contribution, so watch this space!

He gave us a peek at his current [ddev list](https://ddev.readthedocs.io/en/latest/users/cli-usage/#listing-project-information) output showing the status of his current projects, with two more to be added soon.

![](https://ddev.com/app/uploads/2018/04/alex-current-ddev-list-1024x521.png)

### Converting to DDEV

As soon as he realized how easy it was to use, he started telling more people about it and getting his colleagues on board with DDEV. “It had helped me out, so I wanted to help others out.”

He initially introduced his new apprentices to Acquia Dev Desktop, thinking it might be easier to get started with. However, one of his apprentices went to DrupalCamp London and saw a talk by Kevin Bridges and Jeffrey McGuire on how to Turbocharge Your Agency, which included a demo of DDEV. “She was wowed by it. When I said ‘We’re using DDEV,’ I could see a smile on her face.” For them, DDEV was a better Acquia Dev Desktop alternative.

And now it’s official: “Now that’s gone into the Dev Handbook at Digidrop: the local development environment is DDEV.” Digidrop also provides training in marketing and Drupal development. “We did a training event at DrupalCamp London recently, and we used DDEV there, too.”

Not only has he switched his team and training over too DDEV, but he is also getting his contractors over to DDEV, and even his clients. He’s discovered he has fewer errors and they are easier to resolve when everyone is using the same environment. Alex talked about one of his clients,, a large UK university that was originally using DrupalVM. “We moved them over to DDEV mainly because of the number of issues that kept reappearing.” He said, “That saved a lot of time and effort – and a lot of stress saved as well.”

He said it wasn’t difficult to onboard his client. He had written a blog post [about using DDEV for local development](https://medium.com/@aburrows/ddev-docker-aa5fbbba91a7). This showed them to show how easy it was to set up.

### Fast deployment to Platform.sh

Alex said DDEV also speeds up deployment. “We host primarily on Platform.sh. And we use DDEV for local development. But it’s so easy to deploy. We push to GitHub and GitHub deploys to Platform.sh.”

“DDEV works with you, that is really one of the great things about it. You don’t have to modify anything.” He found other solutions to be clunky, “You’d have to potentially drag and drop stuff into different folders before you commit it. With DDEV, you’re adding a configuration file to your Drupal or WordPress site. And you’re running DDEV from that. You stick in a line in .gitignore for the ddev config file, and that’s it. DONE.”

### Using DDEV to speed up sales

DDEV is not only helping Digidrop with local development and deployment, it’s also helping in the sales process. The agency does Drupal and WordPress development, as well as consultancy, and maintenance. “This includes rescue projects,” Alex explained how they help customers who are looking for better relationships with a new agency. “They’re looking for someone that can move them forward.” These projects come with site audits, where Digidrop investigates a potential client’s site as part of the proposal process.

When they’re negotiating with potential clients and before it’s clear whether the conversation will turn into a contract and billable hours, they need to dig into existing applications to scope out how much work there is and how they would approach the project. Alex explained how they needed to “get something up really quickly,” and “evaluate what the supplied code was like, so we could give it a yay or nay on whether we wanted to take on the project. We could do this really quickly with DDEV.”

Photo credit: [Alex Burrows “Drupal mentoring”](https://twitter.com/aburrows/status/913688621248630785)
