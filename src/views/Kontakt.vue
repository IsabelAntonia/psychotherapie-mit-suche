<template>
	  <div>
	    <div class="background-image"></div>
	
	    <div class="content">
	      <h2>Kontakt</h2>
	
	      <p>Kontaktinformationen:</p>
	      <ol>
	        <li>Psychotherapeutische Praxis Barbara Seidl</li>
	        <li>Telefon: 0176 56992742</li>
	        <li>Adresse: Iblherstraße 18, 82380 Peißenberg</li>
	        <li>
	          Telefonische Sprechzeiten: Dienstags 8:00 bis 08:50 und Donnerstags
	          12:00 bis 12:50
	        </li>
	      </ol>
	
	      <div class="row">
	        <v-icon class="col-1">info</v-icon>
	        <p class="withBorder col-10" style="width:100%">
	          Erstanfragen zur Psychotherapie bitte ich immer persönlich während der
	          telefonischen Sprechzeiten an mich zu richten oder alternativ dieses
	          Kontaktformular zu nutzen.
	        </p>
	      </div>
	
	      <div class="twoParagraphs">
	        <v-form
	          ref="form"
	          lazy-validation
	          id="contact-form"
	          v-on:submit.prevent="onSubmit"
	        >
	          <p class="increaseFontSize">Kontaktformular:</p>
	
	          <div class="row">
	            <input type="hidden" name="contact_number" />
	
	            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6">
	              <v-flex>
	                <v-text-field
	                  name="user_name"
	                  id="contactName"
	                  label="Name"
	                  required
	                  outline
	                ></v-text-field>
	              </v-flex>
	            </div>
	
	            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6">
	              <v-flex>
	                <v-text-field
	                  name="user_email"
	                  id="contactEmail"
	                  outline
	                  label="E-mail"
	                  required
	                ></v-text-field>
	              </v-flex>
	            </div>
	          </div>
	
	          <p>Ihre Nachricht:</p>
	          <v-textarea
	            id="contactText"
	            name="contact"
	            counter
	            maxlength="200"
	            full-width
	            auto-grow
	            required
	            outline
	            rows="12"
	          ></v-textarea>
	
	          <p class="smallText">
	            Mit Senden der Anfrage willigen Sie ein von mir kontaktiert zu
	            werden. Es gelten unsere
	            <router-link to="/datenschutzerklärung"
	              >Datenschutzbedingungen</router-link
	            >
	          </p>
	
	          <v-btn color="primary" type="submit">Nachricht senden</v-btn>
	        </v-form>
	
	        <p id="alert" v-if="messageSent">
	          Ihre Nachricht wurde erfolgreich gesendet!
	        </p>
	      </div>
	    </div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'kontakt',
	
	  data() {
	    return {
	      contact_number: 0,
	      messageSent: false,
	      contactName: {},
	      contactEmail: {},
	      contactText: {}
	    }
	  },
	  created() {
	    this.emailInit()
	    //            this.loadContactForm()
	  },
	
	  methods: {
	    emailInit() {
	      emailjs.init('user_2ZSVdu8OaAKK9sMZk1Suz')
	    },
	    onSubmit(e) {
	      //                console.log(e)
	      e.target.contact_number = (Math.random() * 100000) | 0
	      //                console.log(e.target)
	      emailjs.sendForm('gmail', 'template_yFyKQtIG', e.target)
	      //                alert("sent successfully");
	      this.contactForm = document.getElementById('contact-form')
	      this.contactForm.innerHTML = ''
	
	      this.messageSent = true
	    }
	  }
	}
	</script>
	
	<style scoped>
	.withBorder {
	  border: 1px solid black;
	  display: inline;
	  padding: 2%;
	  margin: 0;
	}
	
	.smallText {
	  font-size: 1rem;
	}
	
	input,
	textarea {
	  border: 1px solid black;
	}
	
	#alert {
	  text-align: center;
	  color: #1976d2;
	}
	</style>