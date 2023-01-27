---
title: "Why standardization is important to teaching web development"
pubDate: 2021-01-28
author: Elli Ludwigson
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2021/01/Hilmar-DrupalCon-Amsterdam-by-Illek-Petr.jpg
categories:
  - Community,
  - DDEV
---

_Photo of Hilmar Hallbjörnsson at DrupalCon Amsterdam trivia night 2019 by [Illek Petr](https://flic.kr/p/2hD9UK1)_.

_10 minute read_

How often do you get to chat with a viking about web development? After [DrupalCon Europe](https://events.drupal.org/europe2020) last December a few folks got together on Zoom to emulate our usual “hallway track” coffee hour chats, and I learned that a couple friends have been leveraging [DDEV-Local](https://ddev.com/ddev-local/) to teach web development to newcomers. This is the second blog in the series, please read more about [Mauricio Dinarte giving students a quick path to success here](https://ddev.com/ddev-local/why-an-easy-start-is-important-to-teaching-web-development/).

Hilmar Hallbjörnsson has been a friendly face at Drupal events around the world for so many years we’re not sure where or when exactly we first met. Drupal GovCon? Drupal Europe? In a community fond of headwear, [Hilmar](https://www.drupal.org/u/drupalviking), aka [drupalviking](https://twitter.com/drupalviking), stands out in various horned helmets at events. He is currently living and teaching in Iceland and recently taught a web development course at [Reykjavík University](https://en.ru.is/).

### How long have you been working with Drupal? 

I’ve been a Drupal developer for nine years now, starting back in 2011\. Before that I had written three or four CMSs on my own. After I got to know Drupal, I started crying because I realized that I would never-ever-ever have to write authentication methods again. So it was love at first sight, definitely. In the nine years since it’s just kept growing and maturing in many ways.

Actually, admitting being a PHP developer in Iceland is difficult, it would be easier to admit that you belong to a goat sacrificing cult! People talk about how PHP was back in the day when we were running PHP 4.7 but all my servers are now on PHP 7.4, so things have changed just a bit.

### What topics do you teach new web development students?

I teach a course called “Developing open sourced web software” at Reykjavík University. Because of COVID, they called me in the middle of October, and asked me if I could deliver a course in the last week of November. My colleague, Reynir, and I looked at each other and said “Þetta reddast,” which is a common saying in Iceland: “We will figure it out somehow.” And we did! After this year, we might try to set that up so I could teach it in multiple schools as an online course.

The course begins with exploring: what is open software? What are the types of open software? What are the licenses? What does “free” and open source really mean? Then we got into how web software is delivered, with mostly open source AMP (Apache, MySQL, PHP) stacks. Then we kept on going with how to contribute to open software.

We started with Drupal, had two projects, essays, a verbal exam, and students had to keep a diary to log what they did. Part of that was to train them to write good commit messages later and be able to verbalize what they were doing and why. They got to know Drupal as a site builder, creating a simple music or board game collection on the site, using views, user permissions, image styles and so on. We had to scale down the second project in the course from bug hunting to writing a little API that could look up a song or a board game, and then add it to a collection via services. That was a sufficient challenge for a three week course.

### What tools, software, guides do you offer web development students?

For local development, I used [DDEV](https://github.com/drud/ddev) exclusively. Connecting and setting up everything with DDEV — that was the second time I literally cried. I used to have problems down the ying-yang; I had written five or six huge blog posts just for my own reference on setting up my work computer, to get Apache running, MySQL running, trying to configure SSL (which never worked right), trying to get the debugger running. It was a headache and a half. Then maybe a year or two years later, when I had to do it all again, everything was outdated. 

Almost the whole time that I’ve been working I’ve been a one man team. When you are in a bigger company you would have the DevOps expert who understands everything about Docker, and everything about what’s happening under the hood. I was always trying to understand what exactly Docker was doing at the same time as I needed to be building the site, managing clients, and umpteen other task. 

Then I got DDEV, and being able to say \`brew install ddev\`, then just the \`ddev config\`, enter, enter, enter, then \`ddev start\`. My site is up and running! Oh, I need more memory for Maria DB? Okay, no problem, tikatikatak, \`ddev restart\`, up and running. So being able to both use it professionally and to start students on a project was great. 

I did record a few lectures because we had a very short timeframe of three weeks so there wasn’t time to send them off to research on their own as much. I also refer students to Drupalize.me as supplementary material to the lectures.

But, again, having a tool like DDEV helped me out a lot. DDEV have done the hard work, you are the experts in Docker. I was able to explain how open source software works in general, then point them to DDEV and have them follow the [documentation to install Drupal](https://ddev.readthedocs.io/en/stable/users/cli-usage/#quickstart-guides). It’s important to understand what’s under the hood, but just as with a car, you know there is an engine in the front, and you know the shape of it. But probably you, like me, open the hood, and say nope! let’s call a mechanic.

### What are some pros and cons to using DDEV for local web development?

As a convert from Windows, I’ve been very happy with how quick and easy getting started with a local development environment on a Mac is. All my students that had Mac were up and running within 30 minutes. But we hit some snafus with Windows. Some of them were because they had some other web servers or [port problems](https://ddev.readthedocs.io/en/stable/users/troubleshooting/#webserver-ports-are-already-occupied-by-another-webserver). Any previously configured machine from a student who installed a lot of programs for some of their courses was a headache, but we were able to get everybody up and running. My colleague Reynir runs Windows himself, so he took care of all the Windows people. On his personal machine it was smooth once we figured out that [WSL](https://ddev.com/ddev-local/ddev-wsl2-getting-started/) was the way to go.

There is a little bit of DDEV documentation that could improve. I was trying to use Drupal Console but I couldn’t find how to initiate the Drupal Console with the command line as you would with Drush, eg \`ddev drush\`. _ed note: There’s now an_ [_answer for this on StackOverflow_](https://stackoverflow.com/questions/65400086/drupal-console-with-ddev)_, and_ [_any custom command can be added to DDEV_](https://ddev.readthedocs.io/en/stable/users/extend/custom-commands/)_._

I also noticed if I was trying to debug with drush commands, [xdebug, and phpstorm](https://ddev.com/ddev-local/ddev-local-phpstorm-and-xdebug-debugging/), I had to [ssh into the web container](https://ddev.readthedocs.io/en/stable/users/cli-usage/#ssh-into-containers) and then run the commands, going into the vendor directory. It was just an unfamiliar sequence of things I had to do in order to get to the right place and run the right commands. 

In general, the documentation is good, but it’s very technical. It would be nice to have more visual guides rather than just text. I experience that a lot in my hobby, board games, reading and editing a lot of rule books, so I know that a user often wants a more visual explanation. It’s easy to skip over a line of text and miss something very essential. For a lot of people who are a bit less used to technical documentation it can be a hurdle to get started.

[DDEV-Live hosting](https://ddev.com/ddev-live/) would also benefit from a really clear guide: this is what you do to get up and running, and you’re done. _ed note: Once you sign up for an account on DDEV-Live there’s now a visual stepper to_ [_get started_](https://dash.ddev.com/get-started)_. More soon! please give it a try and let us know what you think._

![Hilmar in a wig with two large braids and a helmet with goat-like horns.](https://ddev.com/app/uploads/2021/01/Hilmar-by-Michael-Cannon.jpg)

@drupalviking photo by Michael Cannon

### Have you worked with other open source CMSs much?

I actually wrote my first WordPress plugin two weeks ago, because I had to create a API endpoint and fetch some data. After that experience, I am more confident that I made the right decision back in 2011 with Drupal! I tried Joomla and Magento back in the day but they’ve changed so much since then.

I’ve also done some custom CMSs with very strange customer requests. Probably the most fun that I’ve had was to make a website where you rented sheep. You would rent a sheep for a year, it lived on the farm, and you got the lamb in spring, then the mutton, wool and whatever in the fall. You could go visit “your” sheep of course, and there was a social aspect on the site with photos and such. But a disconnect with the salesperson resulted in overpromising and under delivering and it didn’t work out. It actually would be very, very exciting to try to implement that again, and use Drupal to do that. It was that kind of project that is so absurd that you really want to see it through.

### How did you become interested in teaching web development?

Before I graduated back in 2012, I was a teacher’s assistant. For my last year, I was the TA for people not living close to Reykjavík who had online meetings instead of in person, so virtual learning is not new to me. My professor was always saying we needed to teach more PHP, all these CMSs are based on it, and that idea just got more focused on Drupal over time.

At Reykjavík University, we have a special project to culminate our studies where students work on something outside of the school, in the “real world,” instead of writing a thesis. I was working as a project manager for the Music Association of Iceland which had a very old system that needed new software, database migration, everything. I approached Reykjavík University with that project, and we were lucky enough to get a great great team of five people, four of whom were women. So, when the school project was finished we were about 85% ready to actually deploy, and that code has actually been up and running since. Very proud of that. 

Then this past fall I pitched a Drupal migration as a project for students and had three students the whole semester doing a Drupal 7 to Drupal 9 transformation of a site. So I was already teaching Drupal when they asked me, can you do this intensive course? Then we just gathered a bit more material and carried on. And now we are proud to say that two of the students are now employees of our company, [Um að gera](https://umadgera.is/). Even prouder that we were able to hire women in both positions.

Everyone learns in different ways for sure. For me, I learn visually, and I learn by example — I am not the greatest investigator. A colleague and best friend of mine works very differently from me, but as a pair we work so great together. He gets bored very, very quickly so he is constantly trying out new things. That’s not what I like to do. He can go and say, okay, I boiled it down, I checked seven different things this is how you do it. He explains that to me in maybe 30 minutes, 60 minutes, because we know each other’s lingo. Then I implement that, and I take it further. And that just works well together. So, strengthening people’s individual skills and tendencies and helping them find where they fit in a team is also an important part of teaching.

### What do you see in the future for teaching, web development, and open source?

I think we just have to do more. What I want to see is: can we streamline and standardise how we teach Drupal? As I said, everyone learns differently, but there are so many approaches, methods, materials it’s overwhelming. Drupalize.me is quite a good website, but the structure going from A to B to C is sometimes a little bit convoluted. I struggled a lot when I was doing the transition from how to site build into teaching people how to really program. Then I found this book — called [Drupal Nine Module Development](https://www.packtpub.com/product/drupal-9-module-development-third-edition/9781800204621), by Daniel Sipos, that was very helpful and very up to date.

At the same time, I was transitioning from functional programming to object oriented programming. Teaching this course also revealed how hard it is to teach object oriented programming. It’s much easier to explain object oriented programming when you have some concrete things to implement, like when I have my students implement custom entities. Just by explaining how the interfaces connect, and I am implementing this interface, and I am extending a base abstract class… The learning curve is such a steep one. You’re not only teaching PHP, and Drupal, you’re also teaching object oriented programming to people who haven’t encountered anything like it before.

### How do you think we could unify efforts and standardize teaching Drupal? Is there an initiative for that already?

If there is an initiative, I would definitely want to be a part of that. We need to have a unified process so there are various tracks to get into Drupal. Where are your skills? Every skillset is important. When we started giving people [contribution credit](https://www.drupal.org/drupalorg/contribution-credit) for documentation and contributing in other ways, not just code, that made our community much, much better. We were almost deteriorating the community by putting coders on a pedestal, and everybody else was not recognized. Having people who are specialists in QA, or who are great with writing or marketing is equally as important as writing the code itself. 

We need an initiative to address how we are teaching Drupal to the world so that any person can come in and understand how things work and how they fit in. That’s why I’m very interested in doing this, to create a solid toolbox for teachers, and to share ideas on how to teach and how to build using realistic example projects. Something you can go through from installation to completion, from a variety of angles. If you’re a site builder start here, do this. If you’re a designer, download this, follow this guide. We are drowning in work in the Drupal world, we need all the help we can get, so how about we have a great way to teach newcomers?

## Where to find Hilmar

Hilmar’s company, for which he is backend Drupal dev, DevOps expert, CEO and CTO is [Um að gera](https://umadgera.is/), and his personal blog is [DrupalViking.com](https://drupalviking.com/). Look forward to a blog post about updating that site from Drupal 8 to Drupal 9 this February!

Do you have expertise in teaching web development? Would you be interested in joining an initiative? [Drupal Core Mentoring](https://www.drupal.org/community/mentoring) is also working to streamline on-boarding for new contributors, especially at DrupalCon events. Continue the conversation with us this spring at [DrupalCon North America](https://ddev.com/events/drupalcon-north-america-2021/)! In the meantime:

[Get started with Drupal and DDEV](https://ddev.com/get-started/)
