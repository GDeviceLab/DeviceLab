App Engine Java Application
Copyright (C) 2010-2012 Google Inc.

## Calendar application

Contains a [Google Cloud Endpoints] API and frontends (mobile and desktop) [AngularJS].
Styles were created using [Bootstrap] and [Topcoat] (http://topcoat.io) for Desktop and Mobile frontends respectively.
Icon set from [icoMoon].

Requires [Apache Maven](http://maven.apache.org) 3.0 or greater, and JDK 6+ in order to run.

To build, run

    mvn package

Building will run the tests, but to explicitly run tests you can use the test target

    mvn test

To start the app, use the [App Engine Maven Plugin](http://code.google.com/p/appengine-maven-plugin/) that is already included in this demo.  Just run the command.

    mvn appengine:devserver

For further information, consult the [Java App Engine](https://developers.google.com/appengine/docs/java/overview) documentation.

To see all the available goals for the App Engine plugin, run

    mvn help:describe -Dplugin=appengine
