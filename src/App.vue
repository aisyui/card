<template>
	<div id="app">
		<link rel="stylesheet" href="https://syui.ai/bower_components/icomoon/style.css" />
		<link rel="stylesheet" href="https://syui.ai/bower_components/font-awesome/css/all.min.css" />
		<div class="menu">
			<a href="/" class="top-icon"><span class="icon-ai"></span></a> 
			<code v-if="loc === 'te'"><a href="https://bsky.app/profile/yui.syui.ai" target="_blank">@yui.syui.ai</a> /ten</code>
			<code v-else-if="loc === 'pr'"><a href="https://bsky.app/profile/yui.syui.ai" target="_blank">@yui.syui.ai</a> /fav 1234567</code>
			<code v-else-if="loc === 'docs' || loc === 'en'"><a href="https://bsky.app/profile/yui.syui.ai" target="_blank">@yui.syui.ai</a> /help</code>
			<code v-else-if="loc === 'di'"><a href="https://bsky.app/profile/yui.syui.ai" target="_blank">@yui.syui.ai</a> /did</code>
			<code v-else-if="loc === 'svn'"><a href="https://bsky.app/profile/yui.syui.ai" target="_blank">@yui.syui.ai</a> /ten pay 7</code>
			<code v-else><a href="https://bsky.app/profile/yui.syui.ai" target="_blank">@yui.syui.ai</a> /card</code>
		</div>

		<div class="search-form">
			<form @submit.prevent="page">
				<input v-model="userid" placeholder="user" value="userid">
				<input type="submit">
			</form> 
			<form @submit.prevent="submit">
				<input v-model="id" placeholder="id" value="id">
				<input type="submit">
			</form> 
		</div>

		<p>
			<a href="/docs"><button>help</button></a> <a href="/en"><button>en</button></a> <a href="/pr"><button>fav</button></a> <a href="/te"><button>ten</button></a> <button v-if="loc.length == 0" v-on:click="did_enable = !did_enable">did</button> <a v-else href="/di"><button>did</button></a> <a href="/c"><button>all</button></a> <a href="/svn"><button>seven</button></a> 
		</p>

		<div v-if="loc.length > 1">
			<div v-if="cards" class="bluesky-card">
				<h3>
					<span v-if="bsky_mode === true"><a :href='"https://bsky.app/profile/" + did' target="_blank">{{ loc }}</a></span>
					<span v-else>{{ loc }}</span>
					<span v-for="iii in rcards.data" class="card-owner-badge">
						<a :href="'/owner#' + iii.id" v-if="iii.owner == loc" target="_blank"><span class="icon-ai"></span></a>
					</span>
					<span v-for="iii in rcards.data">
						<span v-for="iiii in iii.owner" class="card-bluesky-badge">
							<a :href="'/owner#' + iiii.user" v-if="iiii.user == loc" target="_blank">
								<span class="icon-ai"></span>
							</a>
						</span>
					</span>
					<span v-if="this.all === true" class="card-all-badge">
						<span class="icon-ai"></span>
					</span>
					<span v-if="cards.data.find((v) => v.card == 65)" class="card-room-badge">
						<span class="icon-ai"></span>
					</span>
					<span v-if="this.badge_aiten === true" class="card-aiten-badge">
						<span class="icon-power"></span>
					</span>
				</h3>
				<div class="card-all-badge-bottom" >
					<img src="/card/badge_1.png" v-if="cards.data.find((v) => v.card == 18)">
					<img src="/card/badge_2.png" v-if="cards.data.find((v) => v.card == 41)">
					<img src="/card/badge_3.png" v-if="cards.data.find((v) => v.card == 45)">
					<img src="/card/badge_4.png" v-if="cards.data.find((v) => v.card == 75)">
					<img src="/card/badge_5.png" v-if="cards.data.find((v) => v.card == 94)">
					<img src="/card/badge_6.png" v-if="26 == (cards.data.filter((v) => v.card >= 96 && v.card <= 121).length)">
				</div>

				<div class="card_kira_center">
					<button v-on:click="cardoriginstatus" class="card_origin_status"><span class="icon-ai"></span></button> <button v-if="cards.data.filter((v) => v.skill == '3d' && (v.card >= 0 && v.card <= 14 || v.card == 64))[0]" v-on:click="glb_status = !glb_status"  class="unity"><span class="icon-cube"></span></button> <button v-if="model == true || cards.data.filter((v) => v.skill == 'model').length >= 1" v-on:click="vrmviewer"><span class="icon-game"></span></button> <button v-if="game == true" v-on:click="term_status = !term_status"><span class="icon-aiterm"></span></button>
				</div>

				<!--
				1st first
				2nd second 
				3rd third
				4th fourth
				5th fifth
				6th sixth
				7th seventh
				8th eighth
				-->

				<span class="card-fav" v-if="card_origin_status">
					<span class="card-fav" v-for="k in cards.data">
						<tr class="card-status-first" v-if="k.status == 'yui' || k.status == 'first' || k.status == 'second' || k.status == 'second' || k.status == 'third' || k.status == 'fourth' || k.status == 'fifth' || k.status == 'sixth' || k.status == 'seven'" >
							<span class="card-wrapper">
								<span class="reflection">
									<img :src='"/card/card_" + k.card + ".webp"' class="card">
								</span>
								<span :class="'card pattern-' + k.status"></span>
								<span :class="'card color-' + k.status"></span>
								<span :class="'card highlight-' + k.status"></span>
							</span>
						</tr>
					</span>
				</span>
				
				<div class="vrm" v-if="iframe_status == true">
					<iframe src="https://vrm.syui.ai" allowfullscreen frameborder="0" loading="lazy"></iframe>
					<table>
						<tbody>
							<tr>
								<td>attack</td>
								<td>{{ model_attack }}</td>
							</tr>
							<tr>
								<td>critical</td>
								<td>{{ model_critical }}</td>
							</tr>
							<tr>
								<td>critical_d</td>
								<td>{{ model_critical_d }}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="glb" v-if="glb_status == true">
					<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
					<model-viewer v-if="glb_next !== 0" class="ar" :src="'/obj/card_' + glb_next + '.glb'" ar-modes="scene-viewer webxr quick-look" auto-rotate autoplay ar camera-controls></model-viewer>
					<model-viewer v-else class="ar" :src="'/obj/card_' + cards.data.filter((v) => v.skill == '3d' && (v.card >= 1 && v.card <= 14 || v.card == 64))[0].card + '.glb'" ar-modes="scene-viewer webxr quick-look" auto-rotate autoplay ar camera-controls></model-viewer>
					<span v-for="(ii, index) in cards.data.filter((v) => v.skill == '3d' && (v.card >= 1 && v.card <= 14 || v.card == 64))" class="glb">
						<thead>
							<tr>
								<img :src='"/card/card_" + ii.card + ".webp"' v-on:click="glb_next = ii.card">
							</tr>
							<tr>{{ ii.cp }}</tr>
						</thead>
					</span>
				</div>

				<div class="term" v-if="term_status == true">
					<iframe :src="'https://term.syui.ai?user=' + username + '&did=' + did + '&id=' + id" allowfullscreen frameborder="0" loading="lazy"></iframe>
				</div>

				<span class="menu-right-top" v-if="cards.data.find((v) => v.card == 43)">
					<button v-on:click="book_user = !book_user">book</button>
				</span>
				<div class="book-list" v-if="cards.data.find((v) => v.card == 43)" v-show="book_user">
					<a href="/book/1/ZGlkOnBsYzo0aHFqZm43bTZuNWhubzNkb2FtdWhnZWY/index.html">
						<img :src='"/card/card_" + 43 + ".webp"'>
					</a>
				</div>

				<div class="book-list" v-if="cards.data.filter((v) => v.card >= 48 && v.card <= 59)" v-show="chara_user">
					<span v-for="ii in cards.data.filter((v) => v.card >= 48 && v.card <= 59)" class="book-list">
						<a :href="ii.url">
							<img :src='"/card/card_" + ii.card + ".webp"'>
						</a>
					</span>
				</div>

				<div class="card-fav" v-if="user_fav != '0'"><span class="menu-right-top">
					</span>
					<table class="card-fav">
						<span class="card-fav-su">
							{{ ii = cards.data.find((v) => v.id == user_fav) }}
						</span>
						<thead v-if="ii.status == 'yui' || ii.status == 'first' || ii.status == 'second' || ii.status == 'second' || ii.status == 'third' || ii.status == 'fourth' || ii.status == 'fifth' || ii.status == 'sixth' || ii.status == 'seven'" class="card-fav">
							<tr class="card-status-first">
								<span class="card-wrapper">
									<span class="reflection">
										<img :src='"/card/card_" + ii.card + ".webp"' class="card">
									</span>
									<span :class="'card pattern-' + ii.status"></span>
									<span :class="'card color-' + ii.status"></span>
									<span :class="'card highlight-' + ii.status"></span>
								</span>
							</tr>
						</thead>

						<thead v-else-if="ii.card !== null" class="card-fav">
							<tr class="author" v-if="ii.author == 'yui'">
								<img :src='"/card/card_origin2_" + ii.card + ".webp"'>
							</tr>
							<tr v-else-if="ii.author">
								<img :src='"/card/card_origin_" + ii.card + ".webp"'>
							</tr>
							<tr v-else>
								<img :src='"/card/card_" + ii.card + ".webp"'>
							</tr>
						</thead>
						<tbody><tr v-if='ii.author'>@{{ ii.author }}</tr></tbody>
						<tbody><tr><span v-if="ii.skill == 'critical'" class="icon-sandar"></span><span v-if="ii.skill == 'post'" class="icon-moon"></span><span v-if="ii.skill == 'luck'" class="icon-api"></span><span v-if="ii.skill == 'ten'" class="icon-power"></span><span v-if="ii.skill == 'lost'">●</span><span v-if="ii.skill == 'dragon'" class="icon-home"></span><span v-if="ii.skill == 'nyan'">▲</span><span v-if="ii.skill == 'yui'" class="icon-ai"></span><span v-if="ii.skill == '3d'">■</span><span v-if="ii.skill == 'first'" class="icon-moji_a"></span> {{ ii.cp }}</tr></tbody>
						<tbody><tr class="card-fav-status">✧ {{ ii.status }}</tr></tbody>
						<tbody v-if="info == true"><tr>ID {{ ii.card }}</tr>
							<tr>CID {{ ii.id }}</tr></tbody>
					</table>
				</div>

				<div class="card-planet" v-if="planet_status == true">
					<table class="card-fav">
						<thead>
							<span class="card-planet" v-if="planet >= 1000000">
								<iframe :src="planet_url + '?g=galaxy'" scrolling="no" frameborder="0" style="width:155px;height:200px;padding-bottom:14px;" loading="lazy"></iframe>
							</span>
							<span class="card-planet" v-else-if="planet >= 466666">
								<iframe :src="planet_url + '?g=neutron'" scrolling="no" frameborder="0" style="width:155px;height:200px;padding-bottom:14px;" loading="lazy"></iframe>
							</span>
							<span class="card-planet" v-else-if="planet >= 333000">
								<iframe :src="planet_url + '?g=sun'" scrolling="no" frameborder="0" style="width:155px;height:200px;padding-bottom:14px;" loading="lazy"></iframe>
							</span>
							<span class="card-planet" v-else-if="planet >= 1.0">
								<iframe :src="planet_url + '?g=earth'" scrolling="no" frameborder="0" style="width:155px;height:200px;padding-bottom:14px;" loading="lazy"></iframe>
							</span>
							<span class="card-planet" v-else-if="planet > 0">
								<iframe :src="planet_url + '?g=moon'" scrolling="no" frameborder="0" style="width:155px;height:200px;padding-bottom:14px;" loading="lazy"></iframe>
							</span>

						</thead>
						<tbody><tr v-if="planet">M {{ planet }}</tr></tbody>
						<tbody>
							<tr v-if="planet >= 1000000"><span class="icon-ai"></span> galaxy</tr>
							<tr v-else-if="planet >= 466666"><span class="icon-home"></span> neutron</tr>
							<tr v-else-if="planet >= 333000"><span class="icon-ten"></span> sun</tr>
							<tr v-else-if="planet >= 1"><i class="fa-solid fa-earth-americas"></i> earth</tr>
							<tr v-else-if="planet > 0"><span class="icon-moon"></span> moon</tr>
						</tbody>
					</table>
				</div>

				<div class="game-card" v-if="game_login == true && game_screen == true">
					<button v-on:click="gamescreen">min</button>
					<iframe class="game-app" src="https://ue.syui.ai/?AutoConnect=true&hoveringMouse=true&MatchViewportRes=true&AutoPlayVideo=true&FakeMouseWithTouches=true" scrolling="no" frameborder="0" loading="lazy" allowfullscreen></iframe>
			<table>
				<tbody>
					<tr>
						<td>Lv0</td>
						<td>space</td>
						<td>jump</td>
					</tr>
					<tr>
						<td>Lv0</td>
						<td>w, s, a, d</td>
						<td>move</td>
					</tr>
					<tr>
						<td>Lv1</td>
						<td>1</td>
						<td class="blue">attack</td>
					</tr>
					<tr>
						<td>Lv2</td>
						<td>2</td>
						<td class="green">skill</td>
					</tr>
					<tr>
						<td>Lv3</td>
						<td>3</td>
						<td class="red">burst</td>
					</tr>
				</tbody>
			</table>
					<table class="card-fav">
						<thead style="background-color:#fff;">
						</thead>
						<tbody><i class="fa-solid fa-keyboard"></i></tbody>
					</table>
				</div>
				<div class="game-card" v-else-if="game_login == true && game_screen == false">
					<table class="card-fav">
						<thead style="background-color:#fff;">
							<span class="card-planet">
								<iframe class="game-app" src="https://ue.syui.ai/?AutoConnect=true&hoveringMouse=true&MatchViewportRes=true&AutoPlayVideo=true&FakeMouseWithTouches=true" scrolling="no" frameborder="0" loading="lazy" width="768" height="1024" style="width:160px; height:210px; padding-bottom:14px;"></iframe>
							</span>
						</thead>
						<tbody><button v-on:click="gamescreen">full</button></tbody>
						<tbody>E {{ game_exp }}</tbody>
					</table>
				</div>

				<div class="card-button" >
					<button v-on:click="cardtime">new</button> <button v-on:click="sort">cp</button> <button v-on:click="sortcard" >card</button> <button v-on:click="cardinfo">info</button>
				</div>
				<div class="menu-right"><code><strong>ID</strong> {{ id }}</code> <code><span class="icon-power"></span> {{ aiten }}</code> <code><i class="fa-solid fa-cube"></i> {{ cards.data.filter((v) => v.skill == 'lost').length }}</code> 
					<code class="moji-comp" v-if="26 == (cards.data.filter((v) => v.card >= 96 && v.card <= 121).length)" v-on:click="background_change"><span class="icon-ai"></span> {{ (cards.data.filter((v) => v.card >= 96 && v.card <= 121).length) }}</code>
					<code v-else><span class="icon-ai"></span> {{ (cards.data.filter((v) => v.card >= 96 && v.card <= 121).length) }}</code>
					<code><i class="fa-solid fa-earth-americas"></i> {{ planet }}</code> 
				</div>

				<div class="moji" v-if="moji_status == true">
					<table>
						<thead>
							<td v-for="(mm, index) in cards.data.filter((v) => v.card >= 96 && v.card <= 121)">
								<img :src='"/card/card_" + mm.card + ".webp"'>
							</td>
						</thead>
					</table>
				</div>

				<table id="card-box">
					<span v-for="(ii, index) in cards.data">
						<span v-if="ii.status == 'normal' && ii.card !== null">
							<thead v-if="ii.card == 43">
								<td v-if="ii.author == 'yui'" class="author">
									<span class="author_card">@{{ ii.author }}</span>
									<img :src='"/card/card_origin2_" + ii.card + ".webp"'>
								</td>
								<td v-else-if='ii.author' class="author">
									<span class="author_card">@{{ ii.author }}</span>
									<img :src='"/card/card_origin_" + ii.card + ".webp"'>
								</td>
								<td v-else>
									<a href="/book/1/ZGlkOnBsYzo0aHFqZm43bTZuNWhubzNkb2FtdWhnZWY/index.html"><img :src='"/card/card_" + ii.card + ".webp"'></a>
								</td>
							</thead>
							<thead v-else>
								<td v-if="ii.author == 'yui'" class="author">
									<span class="author_card">@{{ ii.author }}</span>
									<img :src='"/card/card_origin2_" + ii.card + ".webp"'>
								</td>
								<td v-else-if='ii.author' class="author">
									<span class="author_card">@{{ ii.author }}</span>
									<img :src='"/card/card_origin_" + ii.card + ".webp"'>
								</td>
								<td v-else>
									<img :src='"/card/card_" + ii.card + ".webp"'>
								</td>
							</thead>
							<tbody><tr><span v-if="ii.skill == 'critical'" class="icon-sandar"></span><span v-if="ii.skill == 'post'" class="icon-moon"></span><span v-if="ii.skill == 'luck'" class="icon-api"></span><span v-if="ii.skill == 'ten'" class="icon-power"></span><span v-if="ii.skill == 'dragon'" class="icon-home"></span><span v-if="ii.skill == 'nyan'">▲</span><span v-if="ii.skill == 'yui'" class="icon-ai"></span><span v-if="ii.skill == '3d'">■</span><span v-if="ii.skill == 'model'"><i class="fa-solid fa-cube"></i></span><span v-if="ii.skill == 'first'" class="icon-moji_a"></span> {{ ii.cp }}</tr></tbody>
							<tbody v-if="info == true"><tr>ID {{ ii.card }}</tr>
								<tr>CID {{ ii.id }}</tr>
								<tr>{{ ii.skill }}</tr>
								<tr>✧ {{ ii.status }}</tr></tbody>
						</span>
						<span v-else-if="ii.card !== null">
							<thead>
								<td v-if="ii.author == 'yui'" class="author">
									<span class="reflection" v-if="ii.card == 43">
										<span class="author_card">@{{ ii.author }}</span>
										<img :src='"/card/card_origin2_" + ii.card + ".webp"'>
									</span>
									<span class="reflection" v-else>
										<span class="author_card">@{{ ii.author }}</span>
										<img :src='"/card/card_origin2_" + ii.card + ".webp"'>
									</span>
								</td>
								<td v-else-if='ii.author' class="author">
									<span class="reflection" v-if="ii.card == 43">
										<span class="author_card">@{{ ii.author }}</span>
										<img :src='"/card/card_origin_" + ii.card + ".webp"'>
									</span>
									<span class="reflection" v-else>
										<span class="author_card">@{{ ii.author }}</span>
										<img :src='"/card/card_origin_" + ii.card + ".webp"'>
									</span>
								</td>
								<td v-else>
									<span class="reflection" v-if="ii.card == 43">
										<a href="/book/1/ZGlkOnBsYzo0aHFqZm43bTZuNWhubzNkb2FtdWhnZWY/index.html"><img :src='"/card/card_" + ii.card + ".webp"'></a>
									</span>
									<span class="reflection" v-else-if="ii.skill == '3d'">
										<a href="#thd_skill" class="thd_link"><img :src='"/card/card_" + ii.card + ".webp"'></a>
									</span>
									<!--ちらつき-->
									<span v-else>
										<img :src='"/card/card_" + ii.card + ".webp"'>
									</span>
									<!--ちらつき-->
								</td>
							</thead>
							<tbody><tr><span v-if="ii.skill == 'critical'" class="icon-sandar"></span><span v-if="ii.skill == 'post'" class="icon-moon"></span><span v-if="ii.skill == 'luck'" class="icon-api"></span><span v-if="ii.skill == 'ten'" class="icon-power"></span><span v-if="ii.skill == 'dragon'" class="icon-home"></span><span v-if="ii.skill == 'nyan'">▲</span><span v-if="ii.skill == 'yui'" class="icon-ai"></span><span v-if="ii.skill == '3d'">■</span><span v-if="ii.skill == 'model'"><i class="fa-solid fa-cube"></i></span><span v-if="ii.skill == 'first'" class="icon-moji_a"></span> {{ ii.cp }}</tr></tbody>
							<tbody v-if="info == true"><tr>ID {{ ii.card }}</tr>
								<tr>CID {{ ii.id }}</tr>
								<tr>{{ ii.skill }}</tr>
								<tr>✧ {{ ii.status }}</tr></tbody>
						</span>
					</span>
				</table>
			</div>
		</div>



		<div v-if="loc === 'di'" class="text-content">
			<h3>did</h3>
			<blockquote class="did">
				<p>
					Decentralized identifiers (DIDs) are a new type of identifier that enables verifiable, decentralized digital identity. A DID refers to any subject (e.g., a person, organization, thing, data model, abstract entity, etc.) as determined by the controller of the DID. In contrast to typical, federated identifiers, DIDs have been designed so that they may be decoupled from centralized registries, identity providers, and certificate authorities. Specifically, while other parties might be used to help enable the discovery of information related to a DID, the design enables the controller of a DID to prove control over it without requiring permission from any other party. DIDs are URIs that associate a DID subject with a DID document allowing trustable interactions associated with that subject.
				</p>
				<p>
					Each DID document can express cryptographic material, verification methods, or services, which provide a set of mechanisms enabling a DID controller to prove control of the DID. Services enable trusted interactions associated with the DID subject. A DID might provide the means to return the DID subject itself, if the DID subject is an information resource such as a data model.
				</p>
				<p>
					This document specifies the DID syntax, a common data model, core properties, serialized representations, DID operations, and an explanation of the process of resolving DIDs to the resources that they represent.
				</p>
			</blockquote>
			<p><a href="https://www.w3.org/TR/did-core/" target="_blank">https://www.w3.org/TR/did-core/</a> </p>
			<p></p>
		</div>

		<div v-if="loc.length == 0">

			<div v-if="cards" class="bluesky-card">
				<p>user : <a :href='"/" + user.data.username'><code v-if="user.data.username">{{ user.data.username }}</code></a></p>
				<p>id : <code>{{ user.data.id }}</code></p>
				<p>did : <code>{{ user.data.did }}</code></p>
				<p>aiten : <code>{{ user.data.aiten }}</code></p>
				<p>handle : <code>{{ user.data.handle }}</code></p>
				<p v-if="user.data.delete == true">status : <code>delete</code></p>
				<p>created_at : <code>{{ user.data.created_at }}</code></p>
				<span v-for="ii in cards.data">
					<img :src='"/card/card_" + ii.card + ".webp"'>{{ ii.cp }}
				</span>
			</div>

			<div v-if="ucard" class="bluesky-card">
				<h3><a :href='"/" + userid'>{{ userid }}</a></h3>
				<span v-for="u in ucard.data">
					<img :src='"/card/card_" + u.card + ".webp"'>{{ u.cp }}
				</span>
			</div>

			<div v-if="record" class="bluesky-record">
				<li v-for="i in record.data">
					<p v-if="i.delete === false"><span class="menu-right-top"> 
							<button v-if="i.model === true"><i class="fa-solid fa-cube"></i></button> <button v-if="i.fav != '0'">✧</button> <a :href="'https://git.syui.ai/' + i.username"  target="_blank"><button v-if="i.username == 'ai'"><i class="fa-brands fa-git-alt"></i></button></a> <button>ID {{ i.id }}</button></span></p>
					<p v-if="i.delete === false"><span class="text"><a :href="'/' + i.username" v-if="i.username">{{ i.username }}</a></span></p>
					<span class="menu-right-did" v-if="i.delete === false && did_enable === true && i.did.includes('did:') === true">
						<button><a :href="'https://plc.directory/' + i.did + '/log'" target="_blank">{{ i.did }}</a></button> 
					</span>
					<span v-else-if="i.did.includes('http') === true && did_enable === true" class="menu-right-did" >
						<button><a :href="i.did" target="_blank">{{ i.did }}</a></button> 
					</span>
				</li>
			</div>
		</div>

		<div v-if="loc === 'vr'" class="text-content">
			<h3>3Dモデル</h3>
			<p>アイの3Dモデルを育成することができます。</p>
			<p>モデルを有効にするには <i class="fa-solid fa-cube"></i> カードが必要になります。</p>
			<p><i class="fa-solid fa-cube"></i> カードは低確率で排出されます。</p>
			<h3>動作環境</h3>
			<table>
				<thead>
					<tr>
						<th>ios/safari</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>ios17</td>
						<td class="green">ok</td>
					</tr>
					<tr>
						<td>ios16</td>
						<td class="red">no</td>
					</tr>
				</tbody>
			</table>
			<p><li>Allow WebGL in Web Workers</li></p>
			<p><li>GPU Process: Canvas Rendering</li></p>
			<p><li>GPU Process: DOM Rendering</li></p>
			<p><li>OffscreenCanvas in Workers</li></p>
			<p><li>OffscreenCanvas</li></p>
			<table>
				<thead>
					<tr>
						<th>pc</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>chrome/chromium</td>
						<td class="green">ok</td>
					</tr>
					<tr>
						<td>edge</td>
						<td class="green">ok</td>
					</tr>
					<tr>
						<td>safari</td>
						<td class="green">yes</td>
					</tr>
					<tr>
						<td>firefox</td>
						<td class="red">no</td>
					</tr>
				</tbody>
			</table>

			<h3>天性レベル</h3>
			<p>それぞれの天性レベルはモデルになったカードに属します。</p>
			<table>
				<thead>
					<tr>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>モード</td>
						<td>アタック</td>
						<td>スキル</td>
						<td>バースト</td>
					</tr>
					<tr>
						<td>card:2</td>
						<td>card:9</td>
						<td>card:3</td>
						<td>card:7</td>
					</tr>
				</tbody>
			</table>
			<p>他で使用するカードの効果が天性レベルx10されることがあります。</p>
			<p>モデルが有効であれば<code>/ten pay</code>でレベルを上げられます。</p>

			<table>
				<thead>
					<tr>
						<th>正式名称</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>mode</td>
						<td>attack</td>
						<td>skill</td>
						<td>burst (limit)</td>
					</tr>
					<tr>
						<td>アイ・モード</td>
						<td>通常攻撃</td>
						<td>原子スキル</td>
						<td>原子バースト</td>
					</tr>
				</tbody>
			</table>

			<h3>固有天性</h3>
			<p>キャラごとに固有天性が3つあります。</p>
			<table>
				<thead>
					<tr>
						<th>固有天性</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>量子テレポート</td>
						<td>記憶した場所に移動</td>
					</tr>
					<tr>
						<td>電子浮遊</td>
						<td>空を飛べる</td>
					</tr>
					<tr>
						<td>大気バリア</td>
						<td>空間の影響を受けない</td>
					</tr>
				</tbody>
			</table>

			<h3>会心系</h3>
			<p>ステータスには会心率と会心ダメージがあります。</p>
			<p><code>/ten</code>で勝利するとステータスが上がります。</p>

			<table>
				<thead>
					<tr>
						<th>会心系</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>会心率</td>
						<td>会心ダメージ</td>
					</tr>
					<tr>
						<td>+1%</td>
						<td>+10%</td>
					</tr>
				</tbody>
			</table>

			<h3>その他</h3>
			<p>キャラのレベルはlostのカード数によって算出されます。</p>
		</div>

		<div v-if="loc === 'docs'"  class="text-content">
			<p>カードは1日に1回、引くことができます</p>
			<p>カードの排出率は以下のとおりです</p>

			<table>
				<thead>
					<tr>
						<th>status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>normal</td>
						<td>rare</td>
						<td>super</td>
					</tr>
					<tr>
						<td>90%</td>
						<td>9%</td>
						<td>1%</td>
					</tr>
				</tbody>
			</table>

			<p>カードには強さを表す数字が入っています</p>

			<table>
				<thead>
					<tr>
						<th>cp</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>normal</td>
						<td>rare</td>
						<td>super</td>
					</tr>
					<tr>
						<td>+0~200</td>
						<td>+0~450</td>
						<td>+0~800</td>
					</tr>
				</tbody>
			</table>

			<h3>対戦について</h3>
			<p><code>@yui.syui.ai /card -b</code></p>
			<p>ランダムマッチ、手持ちの上位3枚のうち1枚がランダムで選ばれます</p>

			<h3>レイドについて</h3>
			<p><code>@yui.syui.ai /card -r</code></p>
			<p>レイドバトル、手持ちで一番強いカードが選ばれます</p>

			<h3>mastodon</h3>
			<p><code><a href="https://mstdn.syui.ai/@yui" target="_blank">@yui@syui.ai</a> /card</code></p>
			<p>mastodonからもカードを引くことができます</p>
			<p>ユーザー名が同じの場合、カードは共通です</p>
			<h3>activitypub mode</h3>
			<p><code>@yui.syui.ai /card ap=false</code></p>
			<p>bsky.socialからactivitypub modeを<code>true</code>/<code>false</code>に切り替える</p>

			<h3>秘密</h3>
			<p><code>レアカード</code>を3枚集めると、いいことがあるかも</p>
			<p>集めた人は<a href="https://bsky.app/profile/syui.ai">@syui</a>まで連絡してみて</p>
			<p>ただし、リアルカードに変わるのは、こちらの<a href="/owner">所有者</a>がいないカードに限られます</p>

			<h3>link</h3>
			<p><a class="menu-link" href="/fa">fanart</a> <a class="menu-link" href="/te">aiten</a> <a class="menu-link" href="/vr">model</a></p>
		</div>

		<div v-if="loc === 'en'"  class="text-content">
			<p>Cards can be drawn once a day</p>
			<p>Card emission rates are as follows</p>

			<table>
				<thead>
					<tr>
						<th>status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>normal</td>
						<td>rare</td>
						<td>super</td>
					</tr>
					<tr>
						<td>90%</td>
						<td>9%</td>
						<td>1%</td>
					</tr>
				</tbody>
			</table>

			<p>The cards have numbers(cp) on them indicating their strength.</p>

			<table>
				<thead>
					<tr>
						<th>cp</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>normal</td>
						<td>rare</td>
						<td>super</td>
					</tr>
					<tr>
						<td>+0~200</td>
						<td>+0~450</td>
						<td>+0~800</td>
					</tr>
				</tbody>
			</table>

			<h3>battle</h3>
			<p><code>@yui.syui.ai /card -b</code></p>
			<p>Random match, one of the top 3 cards on hand will be chosen at random</p>

			<h3>mastodon</h3>
			<p><code><a href="https://mstdn.syui.ai/@yui" target="_blank">@yui@syui.ai</a> /card</code></p>
			<p>support mastodon</p>
			<h3>activitypub</h3>
			<p><code>@yui.syui.ai /card ap=false</code></p>
			<p>activitypub mode disable</p>

			<h3>secret</h3>
			<p>card <a href="/owner">owner</a></p>

			<h3>link</h3>
			<p><a class="menu-link" href="/fa">fanart</a> <a class="menu-link" href="/ph">photo</a> <a class="menu-link" href="/te">aiten</a> <a class="menu-link" href="/pr">fav</a></p>

		</div>

		<div v-if="loc === 'owner'"  class="text-content">
			<div v-for="(ii, index) in rcards.data">
					<div v-show="ii.id < 15" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 22" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<span v-if='ii.owner == "none"' class="card-black">
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<span v-else>
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 25" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 26" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 27" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<span v-if='ii.owner == "none"' class="card-black">
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<span v-else>
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 29" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<span v-if='ii.owner == "none"' class="card-black">
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<span v-else>
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 33" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<span v-if='ii.owner == "none"' class="card-black">
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<span v-else>
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 36" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<span v-if='ii.owner == "none"' class="card-black">
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<span v-else>
							<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						</span>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 39" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						<p v-if="ii.owner">owner :<span v-for="(iii, index) in ii.owner"> <a :href="'/' + iii.user">{{ iii.user }}</a>, </span></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 40" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						<p v-if="ii.owner">owner :<span v-for="(iii, index) in ii.owner"> <a :href="'/' + iii.user">{{ iii.user }}</a>, </span></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 41" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 44" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						<p v-if="ii.owner">owner : <a :href="'/' + ii.owner">{{ ii.owner }}</a></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
					<div v-show="ii.id == 45" class="card-owner-one">
						<button :id="ii.id">card : {{ii.id }} / {{ ii.h }}</button>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
						<p v-if="ii.owner">owner :<span v-for="(iii, index) in ii.owner"> <a :href="'/' + iii.user">{{ iii.user }}</a>, </span></p>
						<p v-if="ii.owner === null">owner : none</p>
					</div>
				</div>
		</div>

		<div v-if="loc === 'te'" class="text-content">
			<div class="iten-start">
				<h3><span class="icon-power"></span> AITEN</h3>
			</div>
			<div v-for="(ii, index) in rcards.data">
				<div v-show="ii.id !== 0">
					<div v-show="ii.id < 15" class="card-owner-one">
						<p :id="ii.id"><button>id:{{ ii.id }}</button></p>
						<p :id="ii.id">[{{ ii.ten }}] {{ ii.h }} / {{ ii.id }}00</p>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
					</div>
					<div v-show="ii.id == 29 || ii.id == 33 || ii.id == 36 || ii.id == 46 || ii.id == 47 || ii.id == 60 || ii.id == 64 || ii.id == 67 || ii.id == 69 || ii.id == 76 || ii.id == 77 || ii.id == 78|| ii.id == 86|| ii.id == 89 || ii.id == 90 || ii.id == 95||ii.id == 122||ii.id == 123||ii.id == 126" class="card-owner-one">
						<p :id="ii.id"><button>id:{{ ii.id }}</button></p>
						<p :id="ii.id">[{{ ii.ten }}] {{ ii.h }} / {{ ii.id }}00 <span class="icon-power"></span></p>
						<p><img :src='"/card/card_" + ii.id + ".webp"'></p>
					</div>
				</div>
			</div>
		</div>

		<div v-if="loc === 'c'" class="text-content">
			<div class="iten-start">
			<p><span class="icon-moji_a"></span> <code>all</code> card</p>
			</div>
			<table id="card-box">
				<span v-for="(ii, index) in rcards.data">
					<thead>
						<td>
							<img :src='"/card/card_" + ii.id + ".webp"'>
						</td>
					</thead>
					<tbody>
						<tr>
							<button>id : {{ ii.id }}</button>
						</tr>
						<tr> <button v-if="ii.ten"><span class="icon-power"></span></button> <button v-if="ii.ten_skill == true" ><span class="icon-ai"></span></button> <button v-if="ii.first_skill == true" ><span class="icon-moji_a"></span></button>
						</tr>
					</tbody>
				</span>
			</table>
		</div>

		<div v-if="loc === 'svn'" class="text-content">
			<p><span class="icon-moji_a"></span> <code>seven</code> owner</p>
			<div class="card-fav" v-for="(ii, index) in sevens.data">
				<table class="card-fav" v-if="ii.card !== 0 && ii.count == 0">
					<thead class="card-fav">
						<tr class="card-status-first">
							<span class="card-wrapper">
								<span class="reflection">
									<img :src='"/card/card_" + ii.card + ".webp"' class="card">
								</span>
								<span class="card pattern-seven"></span>
								<span class="card color-seven"></span>
								<span class="card highlight-seven"></span>
							</span>
						</tr>
					</thead>
					<tbody>
						<tr v-if='ii.handle'><a :href="'/' + ii.handle">@{{ ii.handle }}</a></tr>
						<tr v-if='ii.cp'>{{ ii.cp }}</tr>
					</tbody>
				</table>
			</div>
			<p><code>/ten pay 7</code> <code><span class="icon-power"></span> 70,000,000</code></p>
		</div>

		<div v-if="loc === 'te'" class="text-content">
			<div class="iten-start">
				<p><code>/ten h</code> : ヘルプ</p>
				<p><code>/ten start</code> : 7ターンまでに文字をそろえる</p>
			</div>
		</div>

		<div v-if="loc === 'fa'" class="text-content">
			<p><code>/fa &lt;share-url&gt; &lt;img-url&gt;</code></p>
			<span v-for="(iii, index) in fanarts.data"  class="fan-body">
				<div class="viewer" v-if="iii.delete !== true">
					<p><a :href="iii.link"><img :src="iii.img"/></a></p>
				<p>author : <a :href="'https://bsky.app/profile/' + iii.author">{{ iii.author }}</a></p>
			</div>
		</span>
	</div>

	<div v-if="loc === 'ph'" class="text-content">
		<p><code>/ph &lt;share-url&gt; &lt;img-url&gt;</code></p>
		<span v-for="(iii, index) in photos.data" class="fan-body">
			<div class="viewer" v-if="iii.delete !== true">
				<p><a :href="iii.link"><img :src="iii.img"/></a></p>
			<p>author : <a :href="'https://bsky.app/profile/' + iii.author">{{ iii.author }}</a></p>
		</div>
	</span>
	</div>

	<div v-if="loc === 'pr'" class="text-content">
		<p>お気に入りのカードを1枚だけ登録できます</p>
		<p>数字は自身のカードボックスにある <button>info</button> で確認します。</p>
		<p><img src="/img/docs_fav.jpg"></p>
		<p>下記のコマンドを実行して登録します。</p>
		<p><code>@yui.syui.ai /fav 1</code></p>
		<p>もとに戻すときは <code>0</code> を指定します。</p>
		<p><code>/fav b</code>でバトルできます。</p>
		<p>1日のバトルポイントを消費します。</p>
		</div>

		<footer>
			© syui
		</footer>
	</div>
</template>

<script>
import axios from 'axios'
import moment from "moment";

var loc = window.location.pathname.split('/').slice(-1)[0];

export default {
	name: "App",
	metaInfo() {
		if (loc) {
			return {
				title: "card.syui.ai",
				titleTemplate: '%s/' + loc,
				meta: [
					{property: 'og:title', content: '%s/' + loc}
				]
			}
		} else {
			return {
				title: "card.syui.ai",
				titleTemplate: '%s',
				meta: [
					{property: 'og:title', content: '%s'}
				]
			}
		}
	},
	data () {
		return {
			host: window.location.host,
			all: "",
			badge_aiten: "",
			card: "",
			cards: "",
			loc: window.location.pathname.split('/').slice(-1)[0],
			username: "ai",
			id: "",
			model: "",
			record: "",
			url: "",
			user: "",
			userid: "",
			ucard: "",
			status: "",
			premium: false,
			premium_text: "",
			rcards: "",
			fanarts: "",
			photos: "",
			info: false,
			time: "",
			aiten: "",
			fav: "",
			card_fav: "",
			user_fav: "",
			book_user: "",
			glb_status: false,
			glb_next: 0,
			moji_status: false,
			did_enable: "",
			chara_user: "",
			card_sed: false,
			card_status: "",
			card_skill: "",
			model_attack: "",
			model_critical: "",
			model_critical_d: "",
			sevens: "",
			game: "",
			game_lv: "",
			game_exp: 0,
			api_url: "",
			bsky_mode: false,
			did: "",
			card_origin_status: false,
			planet_status: false,
			game_login: false,
			game_screen: false,
			planet: 0,
			useragent: window.navigator.userAgent.toLowerCase(),
			iframe_status: false,
			term_status: false,
			sort_key: "",
			mount_google_md: false,
			planet_url: "/planet/index.html",
		}
	},
	filters: {
		moment: function(date) {
			return moment.unix(date).format("YYYY.MM.DD");
		},
	},
	computed: {
		loadComponent() {
			return () => import('@google/model-viewer');
		}
	},
	mounted() {
		this.username = "ai";
		this.mount_google_md = false;
		if (window.location.host === "localhost:8080") {
			this.api_url = "/api/";
			//this.planet_url = "http://localhost:3000";
		} else if (window.location.host === "192.168.11.12:8080"){
			this.api_url = "/api/";
		} else {
			if (location.protocol !== "https:") {
				location.replace("https:" + location.href.substring(location.protocol.length));
			}
			this.api_url = "https://api.syui.ai/";
		}
		if (loc === 'owner' || loc === 'te' || loc === 'c'){
			this.rcards = "";
			axios
				.get("/json/card.json")
				.then(response => (this.rcards = response));
		} else if (loc === 'svn'){
			this.cards = "";
			let url = this.api_url + "sevs?itemsPerPage=8000";
			axios
				.get(url)
				.then(response => (this.sevens = response));
		} else if (loc === null || loc === undefined || loc === ''){
			let url = this.api_url + "users?itemsPerPage=3000";
			axios.get(url,{ crossdomain: true })
				.then(response => { 
					this.record = response;
				})
		} else {
			if (this.mount_google_md === false) {
				//this.loadComponent();
				this.mount_google_md = true;
			}
			let url = this.api_url + "users?itemsPerPage=3000";
			axios.get(url,{ crossdomain: true })
				.then(response => { 
					this.record = response;
					this.username = this.record.data.find((v) => v.username == loc).username;
					this.id = this.record.data.find((v) => v.username == loc).id;
					this.planet = this.record.data.find((v) => v.username == loc).planet;
					this.model = this.record.data.find((v) => v.username == loc).model;
					this.did = this.record.data.find((v) => v.username == loc).did;
					this.aiten = this.record.data.find((v) => v.username == loc).aiten;
					this.bsky_mode = this.record.data.find((v) => v.username == loc).bsky;
					this.user_fav = this.record.data.find((v) => v.username == loc).fav;
					this.game = this.record.data.find((v) => v.username == loc).game;
					this.game_lv = this.record.data.find((v) => v.username == loc).game_lv;
					this.model_attack = this.record.data.find((v) => v.username == loc).model_attack;
					this.model_critical = this.record.data.find((v) => v.username == loc).model_critical;
					this.model_critical_d = this.record.data.find((v) => v.username == loc).model_critical_d;
					this.user_room = this.record.data.find((v) => v.username == loc).room;
					this.game_login = this.record.data.find((v) => v.username == loc).login;
					this.game_exp = this.record.data.find((v) => v.username == loc).game_exp;

					if (this.username === "syui") {
						this.game_login = true;
					}
					if (this.planet > 0){
						this.planet_status = true;
					}
					let url = this.api_url + "users/" + this.id + "/card?itemsPerPage=8000";
					axios
						.get("/json/card.json")
						.then(response => (this.rcards = response));
						if (loc.length > 1){
							axios
								.get(url,{ crossdomain: true })
								.then(response => { this.cards = response
														for (let i = 1; i <= 14; i++) {
															this.all = this.cards.data.some(
																b => b.card === i,
																);
																if (this.all === false) {
																	break;
																}
														}
														for (let i = 65; i <= 67; i++) {
															this.badge_aiten = this.cards.data.some(
																b => b.card === i,
																);
																if (this.badge_aiten === false) {
																	break;
																}
														}
								});
						}
				})
		}},
		methods: {
			submit() {
				let url = this.api_url + "users/" + this.id + "/card?itemsPerPage=3000";
				axios
					.get(url,{ crossdomain: true })
					.then(response => (this.cards = response));
					axios
						.get(this.api_url + "users/" + this.id,{ crossdomain: true })
						.then(response => (this.user = response));
			},
			page() {
				this.id = this.record.data.find((v) => v.username == this.userid).id;
				let url = this.api_url + "users/" + this.id + "/card?itemsPerPage=8000";
				axios
					.get(url,{ crossdomain: true })
					.then(response => (this.ucard = response));
					//window.location.href = '/' + this.user;
			},
			sort(){
				if (this.premium) {
					this.premium = false;
					let url = this.api_url + "users/" + this.id + "/card?itemsPerPage=8000";
				}
				return this.cards.data.sort((a, b) => {
					return b.cp - a.cp;
				});
			},
			sortcard(){
				if (this.premium) {
					this.premium = false;
				}
				return this.cards.data.sort((a, b) => {
					return b.card - a.card;
				});
			},
			sortBy(key) {
				this.sort_key = key;
			},
			tagsort(){
				this.memo.sort(function(a,b){
					if(a.updatedTs < b.updatedTs) return -1;
					if(a.updatedTs > b.updatedTs) return 1;
					return 0;
				});
			},
			cardinfo(){
				this.cards = "";
				let url = this.api_url + "users/" + this.id + "/card?itemsPerPage=8000";
				axios
					.get(url,{ crossdomain: true })
					.then(response => (this.cards = response));
					if (this.info == false) {
						this.info = true;
					} else {
						this.info = false;
					}
			},
			gamescreen(){
				if (this.game_screen == true) {
					this.game_screen = false;
				} else {
					this.game_screen = true;
				}
			},
			cardtime(){
					this.cards.data = this.cards.data.slice().reverse();
					this.time = true;
			},
			cardurl(){
				return this.cards.data.sort((a,b) => {
					this.premium = true;
					if (a.url !== "https://card.syui.ai") {
						this.cards.data = this.cards.data.slice().reverse();
					} else {
						a.url = null;
						a.card = null;
					}
				});
			},
			cardoriginstatus() {
				if (this.card_origin_status == false) {
					this.card_origin_status = true;
				} else {
					this.card_origin_status = false;
				}
			},
			background_change() {
    let e = document.body;
				if (this.moji_status == true) {
					this.moji_status = false;
					e.style.backgroundColor = '#f1f1f1';
				} else {
					this.moji_status = true;
					e.style.backgroundColor = '#343434';
				}
			},
			vrmviewer() {
				if (this.iframe_status == false) {
					this.iframe_status = true;
				} else {
					this.iframe_status = false;
				}
			}
		}
}
</script>

<style>
html {
	text-size-adjust:100%;
	-webkit-text-size-adjust:100%;
}
body {
	text-size-adjust:100%;
	-webkit-text-size-adjust:100%;
	background-color: #f1f1f1;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 18px;
	overflow-wrap: anywhere;
	word-break: normal;
	line-break: strict;
}

a {
	color: #847e00;
	text-decoration: none;
}

a:hover {
	color: #008CCF;
}

a.menu-link {
	line-height: 100px;
	background-color:#fff;
	padding: 10px;
}

div#app {
	list-style: none;
	margin: 0 100px;
}
.bluesky-avatar img {
	width: 55px;
}
span.time {
	color: blue;
}
span.name {
	font-weight: 700;
	background-color: #a3c3ff1a;
	padding:10px;
}
span.text {
	font-weight: 400;
	font-size: 19px;
}

.bluesky-record p {
	padding:0 20px 0;
}
.bluesky-record {
	border-radius: 10px;
	margin: 50px 0px 0 0;
}

footer#footer {
	text-align: center;
}

p.tl-avatar img {
	width: 20px;
}

img {
	width: 200px;
	border-radius: 7px;
}

code {
	line-height: 100px;
	padding: 10px 20px;
	background-color: #fff;
	margin: 0 10px 0 10px;
}

li {
	list-style-type: none; 
	background-color: #fff;
	padding:10px;
	margin:10px 0px;
}

footer {
	margin : 100px;
	text-align: center;
}

span.card-owner-badge a {
	color: #abae00;
	padding:0 5px;
}
span.card-bluesky-badge a {
	color: #0db2ff;
	padding:0 5px;
}
span.card-all-badge {
	color: #ff7c00;
	padding:0 5px;
}
span.card-aiten-badge {
	color: #abae00;
	padding:0 5px;
}
span.card-room-badge {
	text-shadow: rgba(0, 0, 0, 0.77) 0px 0 5px;
	color: #fff700;
	padding:0 5px;
}
.card-all-badge-bottom img {
	padding: 0 7px 0 0;
	width:25px;
}

blockquote {
	background-color: #abae00;
	margin: 0px;
	padding: 20px 50px;
	text-align: center;
	color: #fff;
}

.menu span.icon-ai {
	color: #fff700;
	font-size: 23px;
	padding: 10px;
}
.card-owner-one {
	background-color: #fff;
	padding: 2px 15px;
	margin-bottom: 15px;
}

.menu-right-top {
	float: right;
	padding:0px 0px 0px 5px;
}

.menu-right-did {
	padding:0px 0px 0px 5px;
}
.menu-right-did a {
	color: #f1f1f1;
}

span.menu-right-top a.menu-link span.icon-ai {
	color: #ccc;
}

thead.card-fav {
	background-color: #fff;
}
tbody {
	padding: 10px;
	background-color: #fff;
}

table {
	margin-bottom: 2em;
	margin-top: 2em;
	width: 100%;
	border-spacing: 15px;
	text-align: center;
}

table.card-fav {
	border-spacing: 2px;
}

tr {
	line-height:40px;
}

button {
	padding:3px 10px;
	border-radius: 2px;
	border: solid 1px #847e00;
	background-color: #847e00;
	color: #fff;
}
button:hover {
	border: solid 1px #f1f1f1;
}
.card-button {
	float: right;
}

.bluesky-card h3 {
	margin-top: 60px;
}

span.card-fav-su {
	display:none;
}

span.pattern-yui {
  background: repeating-radial-gradient(circle at -150% -25%, #ffff00, #000 3px, #ffff00 3px);
  background-position: 50% 50%;
  background-size: 120% 120%;
  mix-blend-mode: color-dodge;
  opacity: 0.3;
}

span.color-yui {
  background: linear-gradient(115deg, transparent 20%, #ffff00 30%, transparent 48% 52%, #ffff00 70%, transparent);
  background-position: 50% 50%;
  background-size: 200% 200%;
  mix-blend-mode: overlay;
}

span.pattern-first {
  background: repeating-radial-gradient(circle at -150% -25%, #000, #32cd32 3px, #1e90ff 3px);
  background-position: 50% 50%;
  background-size: 120% 120%;
  mix-blend-mode: color-dodge;
  opacity: 0.3;
}

span.color-first {
  background: linear-gradient(115deg, transparent 20%, #00ffff 30%, transparent 48% 52%, #40e0d0 70%, transparent);
  background-position: 50% 50%;
  background-size: 200% 200%;
  mix-blend-mode: overlay;
}

span.pattern-second {
  background: repeating-radial-gradient(circle at -150% -25%, #000, #777 3px, #000 3px);
  background-position: 50% 50%;
  background-size: 120% 120%;
  mix-blend-mode: color-dodge;
  opacity: 0.3;
}

span.color-second {
  background: linear-gradient(115deg, transparent 20%, #000 30%, transparent 48% 52%, #000 70%, transparent);
  background-position: 50% 50%;
  background-size: 200% 200%;
  mix-blend-mode: overlay;
}

span.pattern-third {
  background: repeating-radial-gradient(circle at -150% -25%, #c71585, #777 3px, #ffff00 3px);
  background-position: 50% 50%;
  background-size: 120% 120%;
  mix-blend-mode: color-dodge;
  opacity: 0.3;
}

span.color-third {
  background: linear-gradient(115deg, transparent 20%, #c71585 30%, transparent 48% 52%, #c71585 70%, transparent);
  background-position: 50% 50%;
  background-size: 200% 200%;
  mix-blend-mode: overlay;
}

span.pattern-fourth {
  background: repeating-radial-gradient(circle at -150% -25%, #fff, #777 3px, #fff 3px);
  background-position: 50% 50%;
  background-size: 120% 120%;
  mix-blend-mode: color-dodge;
  opacity: 0.3;
}

span.color-fourth {
  background: linear-gradient(115deg, transparent 20%, #40A4BF 30%, transparent 48% 52%, #404FBF 70%, transparent);
  background-position: 50% 50%;
  background-size: 200% 200%;
  mix-blend-mode: overlay;
}

span.pattern-fifth {
  background: repeating-radial-gradient(circle at -150% -25%, #000, #990033 3px, #990033 3px);
  background-position: 50% 50%;
  background-size: 120% 120%;
  mix-blend-mode: color-dodge;
  opacity: 0.3;
}

span.color-fifth {
  background: linear-gradient(115deg, transparent 20%, #FF0000 30%, transparent 48% 52%, #990033 70%, transparent);
  background-position: 50% 50%;
  background-size: 200% 200%;
  mix-blend-mode: overlay;
}

span.pattern-sixth {
  background: repeating-radial-gradient(circle at center, #f1f1f1, #313131 3px, #fff700 3px);
  background-position: 50% 50%;
  background-size: 120% 120%;
  mix-blend-mode: color-dodge;
  opacity: 0.3;
}

span.color-sixth {
  background: linear-gradient(115deg, transparent 20%, #f1f1f1 30%, transparent 48% 52%, #313131 70%, transparent);
  background-position: 50% 50%;
  background-size: 200% 200%;
  mix-blend-mode: overlay;
}

span.pattern-seven {
  background: repeating-radial-gradient(circle at center, #fff700, #313131 3px, #000700 3px);
  background-position: 50% 50%;
  background-size: 120% 120%;
  mix-blend-mode: color-dodge;
  opacity: 0.3;
}

span.color-seven {
  background: linear-gradient(115deg, transparent 20%, #fff700 30%, transparent 48% 52%, #fff700 70%, transparent);
  background-position: 50% 50%;
  background-size: 200% 200%;
  mix-blend-mode: overlay;
}

span.card-wrapper:hover > span.pattern-yui,span.card-wrapper:hover >  span.pattern-first,span.card-wrapper:hover >  span.pattern-second,span.card-wrapper:hover >  span.pattern-third,span.card-wrapper:hover >  span.pattern-fourth,span.card-wrapper:hover >  span.pattern-fifth, span.card-wrapper:hover >  span.pattern-sixth, span.card-wrapper:hover >  span.pattern-seven {
  background-position: calc(50% + (var(--ratio-x) * -50%)) calc(50% + (var(--ratio-y) * -50%));
}

span.card-wrapper:hover > span.color-yui,span.card-wrapper:hover > span.color-first,span.card-wrapper:hover > span.color-second,span.card-wrapper:hover > span.color-third,span.card-wrapper:hover > span.color-fourth,span.card-wrapper:hover > span.color-fifth, span.card-wrapper:hover > span.color-sixth, span.card-wrapper:hover > span.color-seven {
  background-position: calc(50% + (var(--ratio-x) * -50%)) calc(50% + (var(--ratio-y) * -50%));
}

span.card-wrapper:hover > span.highlight-yui,span.card-wrapper:hover > span.highlight-first,span.card-wrapper:hover > span.highlight-second,span.card-wrapper:hover > span.highlight-third,span.card-wrapper:hover > span.highlight-fourth,span.card-wrapper:hover > span.highlight-fifth, span.card-wrapper:hover > span.highlight-sixth, span.card-wrapper:hover > span.highlight-seven {
  background-repeat: no-repeat;
}

img.card {
	transform: translateY(6px);
}

span.card {
	aspect-ratio: 5/7;
	border-radius: 7px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, .2);
	position: absolute;
	width: 100%;
	height: 96%;
}

span.card-wrapper {
  display: grid;
  place-items: center;
  position: absolute;
}

tr.card-status-first {
	place-items: center;
	position:  relative;
	display: grid;
	margin: 0;
	position: relative;
	height: calc(40vh);
}

span.reflection{
	display: block;
	position:relative;
	overflow:hidden;
}

span.reflection:after {
	content:"";
	height:100%;
	width:30px;
	position:absolute;
	top:-180px;
	left:0;
	background-color: #ffffffa8;
	opacity:0;
	-webkit-transform: rotate(45deg);
	-webkit-animation: reflection 4s ease-in-out infinite;
}

@keyframes reflection {
	0% { -webkit-transform: scale(0) rotate(45deg); opacity: 0; }
	80% { -webkit-transform: scale(0) rotate(45deg); opacity: 0.5; }
	81% { -webkit-transform: scale(4) rotate(45deg); opacity: 1; }
	100% { -webkit-transform: scale(50) rotate(45deg); opacity: 0; }
}

.viewer {
	background-color: #fff;
	margin: 10px 0px;
	padding: 20px;
}

span.card-black p {
	width: fit-content;
	background: #000;
}

span.card-black p img {
	opacity: 0.7;
}

.book-list {
	background-color:#fff;
	margin-bottom: 30px;
	padding:10px 50px 10px 50px;
}

.book-list a img {
	width:150px;
}

thead.card-fav tr img {
	border-radius: 30px;
	padding: 20px;
}

span.book-list {
	padding:10px;
}

.memo-body-content {
	background-color:#fff;
	padding: 10px 30px 10px 30px;
	margin-bottom: 15px;
}

p.memo-time {
	text-align: right;
}

.card-all-badge-bottom {
	margin: 0 0 10px 0;
}

.memo-body-content p code {
	background-color: #f1f1f1;
	padding: 4px 5px 4px 5px;
	margin: 2px;
	border-radius: 4px;
}

span.author_card {
	position: absolute;
	font-size: 9px;
	transform: scale(0.7);
	width: 200px;
	bottom: 2%;
	color:#1f1f1f;
	-webkit-text-size-adjust: 100%;
}

td.author {
	position: relative;
}

.card_kira_center {
	text-align: center;
	margin: 10px 0 30px 0;
}
.card_kira_center button { 
	background-color: #343434;
}

button.card_origin_status {
	border-radius: 2px;
	background-color: #343434;
}

button.card_origin_status:hover {
	color:#ffff00;
}

a.top-icon {
	padding:0 5px 0 15px;
}

model-viewer {
	text-align: center;
	align-content: center;
	width: auto;
	height: 330px;
}

model-viewer.ar {
	padding-bottom : 20px;
}

.sed_relative {
	position: relative;
}
img.sed_model {
	position: absolute;
	width: 50px;
	top: 50px;
	left: 85px;
}

.vrm_button {
	text-align: center;
	padding: 0px 0px 50px 0px;
}

i#vrm_button {
	font-size: 26px;
	color: #fff;
}

iframe {
	width: 100%;
	height: 600px;
}

button.unity {
	background-color: #343434;
	
}

button.unity i#vrm_button {
	font-size:13px;
}

button.unity i#vrm_button:hover {
	color: #fff700;
}

.text-content {
	padding: 50px;
	margin: 30px;
}

@media screen and (max-width:1000px) { 
	tr.card-status-first {
		height: calc(45vh);
	}
	.card-button {
		float: none;
		margin-bottom: 20px;
	}
	.moji {
		display: none; 
	}
	.text-content{
		padding: 50px 0 50px 0;
		margin: 30px 0 30px 0;
	}
	div#app{
		list-style:none;
		margin:0px auto;
		text-align: center;
	}
	.bluesky-avatar img{width:55px}
	span.time{color:#00f}
	span.name{background-color:rgba(163,195,255,.10196078431372549);padding:10px}
	.bluesky-record li{}
	.bluesky-record p{padding:0 20px 0}
	.bluesky-record{border-radius:10px;margin:0px 0px 0 0}
	footer#footer{text-align:center}
	code {
		padding: 10px;
		background-color: #fff;
		margin: 0 10px 0 10px;
	}
	.book-list {
		text-align: center;
	}
	span.author_card {
		font-size: 3px;
		-webkit-text-size-adjust: 300%;
	}
}

@media screen and (min-width:1800px) { 
tr.card-status-first {
		height: calc(30vh);
	}
}

@media screen and (min-width:2000px) { 
tr.card-status-first {
		height: calc(25vh);
	}
}

td.red {
	background-color:#FFCCCC;
}
td.green {
	background-color:#CCFF00;
}

code.moji-comp {
	color: #fff700;
	background-color: #000;
}

.moji {
	background-color:#343434;
}

.moji img {
	width: 100%;
}

.menu {
	background-color: #343434;
	margin: 0 0 30px 0;
	color: #f1f1f1;
}

.menu code {
	background-color: #343434;
	padding: 0;
}

.menu code a {
	color: #fff700;
}

.menu code a:hover {
	color: #847e00;
}

.menu a:hover span.icon-ai{
	color: #847e00;
}

.search-form {
	float: right;
}

span.menu-right-top a:hover button {
	color: #343434;
}

.glb {
	text-align: center;
}

.glb img {
	width: 66px;
}

span.glb {
	margin:5px;
}

.menu-right code {
	padding: 0;
}

blockquote.did {
	background-color: #fff;
	color: #000;
	text-align: left;
}

span.card-planet {
    background-image: url(/card/card_0.webp);
    background-size: cover;
    background-position: center;
    display: inline-block;
    width: 200px;
    border-radius: 3px;
    padding: 23px 0;
}

span.game-card {
    background-image: url(/card/card_0.webp);
    background-size: cover;
    background-position: center;
    display: inline-block;
    width: 200px;
    border-radius: 3px;
    padding: 23px 0;
}

.card-planet table thead {
	background-color: #fff;
}
/*
iframe.game-app {
	width:160px;
	height:210px;
	padding-bottom:14px;
}
*/
</style>
