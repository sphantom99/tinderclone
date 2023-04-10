# tinderclone

TinderClone is a side project I started so as to learn how to use react native along with managing it with expo. It also was my first interaction with google's firebase system which was a very interesting endeavor. 

## Showcase

Let's take a tour on what it is I actually built.

### Login
Initially, the user is greeted with a simple login screen prompting them to login. The login uses a google account and it was done using the expo-auth-session library:
![login screen](https://github.com/sphantom99/tinderclone/blob/master/readmePics/Login.jpg)

### Registration Modal
After logging in, if this is the users first time entering the app he is directed to a small modal with a form that needs to be filled with further information:
![register modal](https://github.com/sphantom99/tinderclone/blob/master/readmePics/Modal.jpg)


### Home Screen
After that, the user is directed to the homescreen where the swiping happens. The user can swipe left or right on all the profiles that are shown to him. This screen also has a header with three items. A profile picture, a tinder logo, and a messages icon. The profile picture logs the user out when clicked. The logo directs the user to the registration modal so as to change any information he has previously given and finally the chats icon redirects the user to chats screen which will be explained futher below.
![Home Screen](https://github.com/sphantom99/tinderclone/blob/master/readmePics/HomeScreen.jpg)


### It's a Match!
When a user swipes right on a user that has previously swiped right on them, they get alerted by this pop up modal prompting the user to head to the chats screen to start the conversation.
![It's a match](https://github.com/sphantom99/tinderclone/blob/master/readmePics/MatchModal.jpg)

### Chats
The Chats screen contains all the matches the user has made throughout his usage of the app. It's a simple list containing the names and profile pictures of the matches.
When a row is clicked the user is transferred to the corresponding chat room.
![Chats](https://github.com/sphantom99/tinderclone/blob/master/readmePics/ChatsScreen.jpg)

### Messages
Finally the messages screen is the chatroom where the user can interact with his matches. As you can see in the picture the user's messages are displayed on the right in a pink color while the other persons are displayed with the profile picture and in a orangish color. The call button at the top does not work at the moment.

## Notes

### DO NOT ACTUALLY USE THIS APP 
This app is a side project, it has many security flaws and things that need to be fixed before it can begin to be usable. 

### Firebase

All of the backend is powered by Firebase, which makes creating and managing documents very easy. There are definitely mistakes in the way this was developed as this was my first time. 

### Tailwind
All the styling was done with the usage of tailwind with the nativewind library. 

## TODOS
There are many things I would like to do in the future to improve this app. For example there needs to be a middleware to handle the swiping so as to separate backend logic from the frontend and to secure users privacy. Another example would be to add user storage for their photos and the ability to add multiple photos making the card in the homescreen a carousel. Lastly I would like to optimize it so that it draws more profiles when the user is nearing the end of the stack, in other words a sort of pagination.
