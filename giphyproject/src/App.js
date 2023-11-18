import "./App.css";
import Logo from "./favicon.png";
import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Link,
	Routes,
	Route,
} from "react-router-dom";
import AuthDetails from "./AuthDetails";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "firebase/firestore";
import "firebase/compat/firestore";

//käyttäjän tunniste, alustettu oletuksena tyhjäksi, päivittyy kirjautuessa
let uid;

function TopNavBar() {
	let profiiliNimi = "Favorites";
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	auth.onAuthStateChanged(user => {
		if (user) {
			console.log("User ID currently signed in: " + user.uid);
			setIsLoggedIn(true);
		} else {
			console.log("No user is signed in.");
			setIsLoggedIn(false);
		}
	});

	//sisäänkirjautumisikkuna
	const LoginPopUp = () => {
		const [email, setEmail] = useState("");
		const [pass, setPass] = useState("");

		const handleSubmit = (e) => {
			e.preventDefault();
			console.log(email);
			signInWithEmailAndPassword(auth, email, pass)
				.then((userCredential) => {
					console.log(userCredential);
					const user = userCredential.user;
					uid = user.uid;
					// säilytä uid välimuistissa
					localStorage.setItem('uid', uid);
					const newUser = { uid: uid, email: email };
					fetch('http://localhost:5000/users', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(newUser)
					})
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((error) => {
					console.log(error);
				});
		};

		return (
			<div>
				<Popup trigger={<button> Login </button>} modal nested>
					{(close) => (
						<section className="login-container">
							<h1 className="page-header">Login</h1>
							<form
								className="login-form"
								onSubmit={handleSubmit}
							>
								<div>
									<label htmlFor="email">email</label>
									<input
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										type="email"
										placeholder="youremail@gmail.com"
										id="email"
										name="email"
									/>
								</div>
								<div>
									<label htmlFor="password">password</label>
									<input
										value={pass}
										onChange={(e) =>
											setPass(e.target.value)
										}
										type="password"
										placeholder="********"
										id="password"
										name="password"
									/>
								</div>
								<div className="login-button-holder">
									<button type="submit">Login</button>
									<button
										type="close"
										className="exit-button"
										onClick={() => close()}
									>
										X
									</button>
								</div>
							</form>
						</section>
					)}
				</Popup>
			</div>
		);
	};

	//käyttäjän luonti-ikkuna
	const RegisterPopUp = () => {
		const [email, setEmail] = useState("");
		const [pass, setPass] = useState("");
		const [name, setName] = useState("");

		const handleRegister = (e) => {
			e.preventDefault();
			console.log(email);
			createUserWithEmailAndPassword(auth, email, pass)
				.then((userCredential) => {
					console.log(userCredential);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		return (
			<div>
				<Popup trigger={<button> Register </button>} modal nested>
					{(close) => (
						<section className="register-container">
							<h1 className="page-header">Register</h1>
							<form
								className="register-form"
								onSubmit={handleRegister}
							>
								<div>
									<label htmlFor="name">Full name</label>
									<input
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										name="name"
										id="name"
										placeholder="Full name"
									/>
								</div>
								<div>
									<label htmlFor="email">email</label>
									<input
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										type="email"
										placeholder="youremail@gmail.com"
										id="email"
										name="email"
									/>
								</div>
								<div>
									<label htmlFor="password">password</label>
									<input
										value={pass}
										onChange={(e) =>
											setPass(e.target.value)
										}
										type="password"
										placeholder="********"
										id="password"
										name="password"
									/>
									<p>
										The password must contain atleast 6
										characters!
									</p>
								</div>
								<div className="register-button-holder">
									<button type="submit">Register</button>
									<button
										type="close"
										className="exit-button"
										onClick={() => close()}
									>
										X
									</button>
								</div>
							</form>
						</section>
					)}
				</Popup>
			</div>
		);
	};

	return (
		<div className="navbar">
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			{isLoggedIn ? <Link to="/profiili">{profiiliNimi}</Link> : null}
			<AuthDetails />
			{isLoggedIn ? (
					<ul>

					</ul>
				) : (
					<ul>
						<li className="active">
							<LoginPopUp />
						</li>
						<li>
							<RegisterPopUp />
						</li>
					</ul>
				)}
			<img id="profiiliKuva" src={Logo} alt="profiilikuva"></img>
		</div>
	);
}

//GIPHY-api:n kutsumisfunktio
function GetJson() {

	//API kutsun alustaminen
	const apiKey = "&api_key=[INSERT API KEY HERE]";
	const endpoint = "https://api.giphy.com/v1/gifs/search?"; 
	const query = "&q=";
	
	const [searchTerm, setSearchTerm] = useState(""); //Hakutermi, oletus ei mitään
	const [limit, setLimit] = useState(10); //Tuloksien raja, oletus 10
	const [imageUrls, setImageUrls] = useState([]); //Tulostettavat gifit
	
	//Asettaa hakutermin käyttäjän tekstistä
	const handleSearchTerm = (event) => {
		setSearchTerm(event.target.value);
	};

	//Asettaa tuloksien maksimimäärän käyttäjän arvosta
	const handleLimit = (event) => {
		if (parseInt(event.target.value) == null) {
			setLimit(1);
		}
		setLimit(parseInt(event.target.value));
	};

	//Toteuttaa kyselyn GIPHY API hin käyttäjän valitsemalla hakusanalla
	const handleSearch = () => {
		if (searchTerm.trim() === "") {
			return;
		}

		const apiUrl = `${endpoint}${apiKey}${query}${searchTerm}&limit=${limit}`;

		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				const urls = data.data.map((item) => item.images.downsized.url);
				setImageUrls(urls);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<section className="ylapalkki">
				<div className="haku">
					<label htmlFor="hakuInput">Search term: </label>
					<input
						type="text"
						id="hakuInput"
						value={searchTerm}
						onChange={handleSearchTerm}
					/>
					<label htmlFor="tuloksiaInput">Limit: </label>
					<input
						type="number"
						id="tuloksiaInput"
						value={limit}
						onChange={handleLimit}
					/>
				</div>
			</section>
			<div className="searchButton">
				<button id="searchBtn" onClick={handleSearch}>
					Search
				</button>
			</div>
			<DisplayGiphy giphyArray={imageUrls}/>
		</div>
	);
}

function DisplayGiphy(props) {
	const imageUrls = props.giphyArray;
	
	// Kun käyttäjä painaa sydäntä gifin päällä, ota kuvan url ja tallentaa sen paikalliseen tietokantaan
	const favoriteItem = (event) => {
		const selectedGif = event.currentTarget.previousSibling;
		const selectedUrl = selectedGif.href;
		console.log(selectedUrl);
		uid = auth.currentUser.uid;
		console.log(uid);

		fetch(`http://localhost:5000/users/${uid}/favs`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ favs: selectedUrl })
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				console.log('New favorite items added:', data);
			})
			.catch(error => {
				console.error('Error adding new favorite items:', error);
			});

	};

	return (
		<div className="kuvia">
		{imageUrls.map((url, index) => (
			<div className="kuva"
				key={`favImage ${index}`}
				>
				<a href={url} target="_blank" rel="noreferrer">
					<img
						src={url}
						alt={`kuva ${index}`}
						className="gifi"
					/>
				</a>
				<p
					className="like"
					id={index}
					onClick={favoriteItem}
				>
					🧡
				</p>
			</div>
		))}
	</div>
	)
}

//Noutaa ja näyttää käyttäjän tallentamat GIF:it tietokannasta
const DisplayGifs = ({ uid }) => {
	const [gifUrls, setGifUrls] = useState([]);

	useEffect(() => {
		//Noda käyttäjän omat GIF:it
		fetch(`http://localhost:5000/users/${uid}/favs`)
			.then(response => response.json())
			.then(data => setGifUrls(data.favs))
			.catch(error => console.error(error));
	}, [uid]);

	//Poistaa käyttäjän valitseman kuvan
	const dislikeItem = (event) => {
		const selectedGif = event.currentTarget.previousSibling;
		const selectedUrl = selectedGif.href;
		console.log("selected url: " + selectedUrl);
		uid = auth.currentUser.uid;
		console.log("uid: " + uid);

		fetch(`http://localhost:5000/users/${uid}/favs`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ favs: selectedUrl })
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				console.log('Favorite deleted:', data);
				//ota poistettu kuva pois näkyviltä
				setGifUrls(gifUrls.filter(gif => gif !== selectedUrl));
			})
			.catch(error => {
				console.error('Error deleting favorite items:', error);
			});

			
	}

	return (
		<div>
			<div className="tykätyt-header">
				<h3 className="Tykätyt-teksti">❤ Favorites:</h3>
			</div>
			{/* Näytä tykätyt kuvat, jos niitä on, muuten älä */}
			{gifUrls ? <div className="kuvia">
				{gifUrls.map((url, index) => (
					<div className="kuva"
						key={`favImage ${index}`}
					>
						<a href={url} target="_blank" rel="noreferrer">
							<img
								src={url}
								alt={`tykätty kuva ${index}`}
								className="gifi"
							/>
						</a>
						<p
							className="like"
							id={index}
							onClick={dislikeItem}
						>
							🤎
						</p>
					</div>
				))}
			</div> : null}
		</div>
	);
};


/* Home sivusto */
const Home = () => {
	return (
		<div>
			<GetJson />{" "}
		</div>
	);
};

/* About sivusto */
const About = () => {
	return (
		<div className="about-main">
			<div>
				<h1>What is this project?</h1>
				<p>
					Giphygle is the project of our team. The idea was to create
					a useful page from which to seek GIFs through the Giphy-API.{" "}
				</p>
				<p>The page is developed via the React-framework.</p>
				<h1>How does it work?</h1>
				<p>
					The Home-page has a search bar. You can put in the search
					term for the images. The search button looks through the
					giphy API using the search term. After this you can hover
					over the images to open them in a new tab or click the heart
					icon to add them to favorites.
				</p>
			</div>
			<h2>Meet the team</h2>
			<ul>
				<li>Onni Alasaari</li>
				<li>Tapio Humaljoki</li>
				<li>Edvard Nivala</li>
				<li>Miiko Majewski</li>
			</ul>
		</div>
	);
};

/* Profiili sivusto */
const Profiili = () => {
	const uid = localStorage.getItem('uid');

	return (
		<div className="profile-main">
			<section className="profile-header">
			<h1>User profile</h1>
				<div>
					Here you can look through the images you have added to
					favorites.
				</div>
			</section>
			<DisplayGifs uid={uid} />
		</div>
	);
};

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<TopNavBar />
					<h2>GIPHYGLE</h2>
				</header>
			</div>

			{/* Routit ------ Link to:t löytyy TopNavBarin returnista */}
			<Routes>
				<Route path="/" element={<Home />}></Route>

				<Route path="/about" element={<About />}></Route>

				<Route path="/profiili" element={<Profiili />}></Route>
			</Routes>
		</Router>
	);
}

export default App;