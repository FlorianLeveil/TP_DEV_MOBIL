import { IonItemSliding,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonItemOptions, IonItemOption, IonNote, IonList, IonListHeader, IonAvatar } from '@ionic/react';
import React, { useContext, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { ROUTE_CONVERSATION } from '../nav/Routes';
import './Home.css';
import firebase from "../firebase";
import "firebase/firestore";
import AppContext, { UserData } from '../data/app-context';


const Home: React.FC = () => {
	return (
	<IonPage>
		<IonContent>
		<IonList>
			<IonListHeader>
				Messages non lues
			</IonListHeader>

			<IonItemSliding >
				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Finn</h2>
						<h3>I'm a big deal</h3>
						<p>Listen, I've had a pretty messed up day...</p>
					</IonLabel>
					<IonNote slot="end" color="primary">99</IonNote>
				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>

			<IonItemSliding>

				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Han</h2>
						<h3>Look, kid...</h3>
						<p>I've got enough on my plate as it is, and I...</p>
					</IonLabel>
					<IonNote slot="end" color="primary">2</IonNote>

				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>

			<IonItemSliding>

				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Rey</h2>
						<h3>I can handle myself</h3>
						<p>You will remove these restraints and leave...</p>
					</IonLabel>
					<IonNote slot="end" color="primary">1</IonNote>

				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>

			<IonItemSliding>

				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Luke</h2>
						<h3>Your thoughts betray you</h3>
						<p>I feel the good in you, the conflict...</p>
					</IonLabel>
				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>

		</IonList>
		<IonList>
			<IonListHeader>
				Conversations
			</IonListHeader>

			<IonItemSliding>
				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Finn</h2>
						<h3>I'm a big deal</h3>
						<p>Listen, I've had a pretty messed up day...</p>
					</IonLabel>
				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>

			<IonItemSliding>

				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Han</h2>
						<h3>Look, kid...</h3>
						<p>I've got enough on my plate as it is, and I...</p>
					</IonLabel>

				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>

			<IonItemSliding>

				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Rey</h2>
						<h3>I can handle myself</h3>
						<p>You will remove these restraints and leave...</p>
					</IonLabel>

				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>

			<IonItemSliding>

				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Luke</h2>
						<h3>Your thoughts betray you</h3>
						<p>I feel the good in you, the conflict...</p>
					</IonLabel>
				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>
			<IonItemSliding>

				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Luke</h2>
						<h3>Your thoughts betray you</h3>
						<p>I feel the good in you, the conflict...</p>
					</IonLabel>
				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>
			<IonItemSliding>

				<IonItem routerLink={ROUTE_CONVERSATION}>
					<IonAvatar slot="start">
					<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
					</IonAvatar>
					<IonLabel>
						<h2>Luke</h2>
						<h3>Your thoughts betray you</h3>
						<p>I feel the good in you, the conflict...</p>
					</IonLabel>
				</IonItem>
				<IonItemOptions side="start">
					<IonItemOption color="primary">Mark Unread</IonItemOption >
				</IonItemOptions>
				<IonItemOptions side="end">
					<IonItemOption color="danger">Delete</IonItemOption >
				</IonItemOptions>
			</IonItemSliding>

		</IonList>
		</IonContent>
	</IonPage>
  );
};

export default Home;
