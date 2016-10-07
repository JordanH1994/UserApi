DROP TABlE IF EXISTS users;

CREATE TABLE users(
ID serial PRIMARY KEY,
email VARCHAR(255),
forename VARCHAR(30),
surename VARCHAR(30),
created_on VARCHAR(255)
);

INSERT INTO users (email, forename, surename, created_on) VALUES ('bar@foo.com','bar','foo', '2016-08-11, 17:29');
INSERT INTO users (email, forename, surename, created_on) VALUES ('foo@bar.com','foo','bar', '2016-08-11, 17:12');
INSERT INTO users (email, forename, surename, created_on) VALUES ('foo@test.com','foo', 'test', '2015-09-11 10:12');
INSERT INTO users (email, forename, surename, created_on) VALUES ('euismod.in.dolor@convallisliguladonec.co.uk','craig','harding','2017-02-18 07:49');
INSERT INTO users (email, forename, surename, created_on) VALUES ('ultrices@dolor.co.uk','micah','compton','2015-08-20 15:34');
INSERT INTO users (email, forename, surename, created_on) VALUES ('mauris.ipsum@euismodet.co.uk','wesley','mcfadden','2016-05-02 10:14');
INSERT INTO users (email, forename, surename, created_on) VALUES ('aenean.eget@elit.ca','rogan','francis','2017-01-07 04:21');
INSERT INTO users (email, forename, surename, created_on) VALUES ('luctus@non.com','ryder','hughes','2016-03-13 17:46');
INSERT INTO users (email, forename, surename, created_on) VALUES ('quisque.ac.libero@musproin.edu','james','emerson','2016-08-12 14:40');
INSERT INTO users (email, forename, surename, created_on) VALUES ('tempor.est@sodalesmaurisblandit.org','eaton','bishop','2015-10-31 21:27');
INSERT INTO users (email, forename, surename, created_on) VALUES ('nam@vestibulum.com','christian','burnett','2017-02-28 10:26');
INSERT INTO users (email, forename, surename, created_on) VALUES ('erat@odioa.net','justin','colon','2016-07-03 17:24');
INSERT INTO users (email, forename, surename, created_on) VALUES ('vel@posuereenimnisl.co.uk','murphy','garza','2015-12-21 23:25');
INSERT INTO users (email, forename, surename, created_on) VALUES ('duis.risus@dapibusidblandit.ca','neville','shields','2016-09-07 13:18');
INSERT INTO users (email, forename, surename, created_on) VALUES ('tristique.pellentesque@lacusaliquam.org','leonard','massey','2015-09-28 07:52');
INSERT INTO users (email, forename, surename, created_on) VALUES ('mi.eleifend@blanditenimconsequat.edu','knox','gonzalez','2016-11-25 02:40');
INSERT INTO users (email, forename, surename, created_on) VALUES ('est.nunc.laoreet@donecest.edu','fritz','hewitt','2015-09-27 15:01');
INSERT INTO users (email, forename, surename, created_on) VALUES ('consequat.nec.mollis@vehiculapellentesque.edu','tate','pena','2016-06-12 12:33');
INSERT INTO users (email, forename, surename, created_on) VALUES ('phasellus.libero.mauris@curae.com','austin','cohen','2017-01-19 17:46');
INSERT INTO users (email, forename, surename, created_on) VALUES ('diam.at@maurisvestibulumneque.edu','cairo','emerson','2016-04-13 00:35');
INSERT INTO users (email, forename, surename, created_on) VALUES ('auctor.non@enimnectempus.net','jacob','mooney','2016-06-21 02:18');
INSERT INTO users (email, forename, surename, created_on) VALUES ('ligula.elit.pretium@arcuetpede.org','honorato','barrett','2017-06-12 13:58');
INSERT INTO users (email, forename, surename, created_on) VALUES ('maecenas.libero.est@nullaaliquet.com','josiah','burt','2015-11-19 05:40');
INSERT INTO users (email, forename, surename, created_on) VALUES ('magna.nam.ligula@ligulanullam.ca','dominic','pruitt','2016-09-02 04:37');
INSERT INTO users (email, forename, surename, created_on) VALUES ('eget.ipsum@turpisvitaepurus.ca','rudyard','randall','2015-12-15 20:04');
