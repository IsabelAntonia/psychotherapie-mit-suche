<template>
  <div>
    <div class="background-image"></div>

    <div class="content" style="display: flex; flex-direction: column;">
      <h2 class="hidden-sm-and-up">Suche</h2>
      <h2 class="hidden-xs-only">Therapeutensuche</h2>

      <p>
        Aufgrund der hohen Nachfrage nach Therapieplätzen - besonders auf dem
        Land - kann sich die Suche nach einem Psychotherapeuten schwierig
        gestalten. Es ist uns ein Anliegen, dass wir dazu beitragen, ihre Suche
        angenehmer zu machen. Deswegen stellen wir hier eine Suchfunktion mit
        Filtern zur Verfügung. So können Sie unmittelbar sehen, welcher
        Therapeut im Moment nur eine kurze oder gar keine Wartezeit hat. Bitte
        beachten Sie, dass die Suchergebnisse ausschließlich aus dem Landkreis
        Weilheim-Schongau kommen und nicht alle Therapeuten hier registiert
        sind. Die Ergebnisse werden nach Nähe zu der von Ihnen wahlweise
        angegebenen Adresse angezeigt.
      </p>
      <p class="moreMarginBottom">
        Wichtig: Das Adressfeld ist kein Pflichtfeld. Wenn Sie keine Adresse
        nennen, werden die Therapeuten, die Ihre Suchkriterien erfüllen
        alphabetisch sortiert angezeigt. Es besteht ebenfalls die Möglichkeit
        statt ihrer vollen Adresse lediglich eine Postleitzahl anzugeben.
      </p>

      <div class="moreMarginBottom" style="font-size: 18px">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <p>Straße:</p>
            <v-flex xs12 sm12 md12 lg9 xl9>
              <v-text-field v-model="street" outline></v-text-field>
            </v-flex>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <p>Hausnummer:</p>
            <v-flex xs4 sm4 md3 lg2 xl2>
              <v-text-field v-model="hausnummer" outline></v-text-field>
            </v-flex>
          </div>
        </div>

        <div class="row moreMarginBottom">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <p>Ort:</p>
            <v-flex xs12 sm12 md12 lg9 xl9>
              <v-text-field v-model="ort" outline></v-text-field>
            </v-flex>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <p>Postleitzahl:</p>
            <v-flex xs4 sm4 md3 lg4 xl4>
              <v-text-field v-model="postleitzahl" outline></v-text-field>
            </v-flex>

            <div v-if="noPLZ">
              <p class="makeTextRed">
                Bitte geben Sie eine Postleitzahl an. Zur eindeutigen Bestimmung
                Ihrer Adresse benötigen wir eine Postleitzahl.
              </p>
            </div>
          </div>
        </div>

        <p>Patientengruppe:</p>
        <v-container
          style="padding:0 !important"
          class="moreMarginBottom"
          fluid
        >
          <v-radio-group column>
            <v-radio
              label="Kinder/Jugendliche"
              name="patientengruppe"
              color="primary"
              value="kinder/jugendliche,"
            ></v-radio>
            <v-radio
              label="Erwachsene"
              name="patientengruppe"
              color="primary"
              value="erwachsene"
            ></v-radio>
          </v-radio-group>
        </v-container>

        <p style="margin-bottom: 20px;">Therapieverfahren:</p>
        <v-flex class="moreMarginBottom" style="color=white" xs12 sm6>
          <v-select
            :items="items1"
            v-model="selectedTherapieverfahren"
            label="Auswählen"
            outline
          >
          </v-select>
        </v-flex>

        <p>Abrechnung:</p>
        <v-container
          class="moreMarginBottom"
          style="padding:0 !important"
          fluid
        >
          <v-radio-group column>
            <v-radio
              label="Gesetzliche Krankenkasse"
              color="primary"
              name="abrechnung"
              value="gesetzlich"
            ></v-radio>
            <v-radio
              label="Private Krankenversicherung"
              color="primary"
              name="abrechnung"
              value="privat"
            ></v-radio>
          </v-radio-group>
        </v-container>

        <p style="margin-bottom: 20px;">Wartezeit:</p>
        <v-flex xs12 sm6>
          <v-select
            :items="items2"
            v-model="selectedWartezeit"
            label="Auswählen"
            outline
          >
          </v-select>
        </v-flex>
      </div>

      <v-btn
        style="align-self: center; width: 15%"
        large
        color="primary"
        v-on:click="filter()"
        >Suchen</v-btn
      >

      <div class="makeTextRed" v-if="wrongInput">
        <p class="text-center">Bitte überprüfen Sie Ihre Adresseingabe.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'therapeutensuche',
  data() {
    return {
      items2: [
        {
          value: {
            number: 0,
            myText: 'Nicht wichtig'
          },
          text: 'Nicht wichtig'
        },
        {
          value: {
            number: 1,
            myText: 'Freier Therapieplatz verfügbar'
          },
          text: 'Freier Therapieplatz verfügbar'
        },
        {
          value: {
            number: 2,
            myText: 'Unter 2 Wochen'
          },
          text: 'Unter 2 Wochen'
        },
        {
          value: {
            number: 3,
            myText: 'Unter 4 Wochen'
          },
          text: 'Unter 4 Wochen'
        },
        {
          value: {
            number: 4,
            myText: 'Unter 2 Monaten'
          },
          text: 'Unter 2 Monaten'
        }
      ],
      items1: [
        'Nicht wichtig',
        'Analytische Psychotherapie',
        'Tiefenpsychologisch fundierte Psychotherapie',
        'Verhaltenstherapie',
        'Systemtische Therapie'
      ],
      therapeuten: [],
      selectedTherapieverfahren: [],
      selectedWartezeit: [],
      mySpecialArray: [],
      anotherArray: [],
      myFilter: false,
      noResults: false,
      therapeutenWithoutOrder: [],
      addresses: [],
      street: '',
      hausnummer: '',
      ort: '',
      postleitzahl: '',
      userAddress: [],
      distances: [],
      wrongInput: false,
      noPLZ: false,
      noAddress: false,
      myStatus: false
    }
  },
  mounted() {
    this.$store.dispatch('getTherapists')
  },
  computed: {
    therapists() {
      //                console.log(this.$store.getters.therapists)
      //                return this.$store.getters.therapists
      return this.$store.state.therapists
    }
  },
  methods: {
    moveOn6: function() {
      this.$router.replace('ergebnis')
    },
    filter() {
      var checkedCheckbox = Array.from(
        document.querySelectorAll('input[name=patientengruppe]:checked')
      ).map(arrayElement => arrayElement.value)
      var checkedCheckboxSec = Array.from(
        document.querySelectorAll('input[name=abrechnung]:checked')
      ).map(arrayElement => arrayElement.value)
      var myNumber = this.selectedWartezeit.number
      // shorter waittime should also be included
      // if i can accept a waittime of one month i can also accept a waittime that is shorter
      var i
      for (i = 0; i < this.items2.length; i++) {
        if (this.items2[i].value.number < myNumber) {
          this.mySpecialArray.push(this.items2[i])
          // pushing these waittimes in the mySpecialArray
        }
      }
      for (i = 0; i < this.mySpecialArray.length; i++) {
        this.anotherArray.push(this.mySpecialArray[i].value.myText)
        // pushing the texts of the mySpecialArray in the anotherArray
      }
      this.therapeutenWithoutOrder = this.therapists.filter(everyMember => {
        var arrP = everyMember.therapists.patientengruppe
          .toLowerCase()
          .split(' ')
        var patientFilter =
          arrP.includes(checkedCheckbox[0]) || checkedCheckbox.length == 0
        var arrA = everyMember.therapists.abrechnung.toLowerCase().split(' ')
        var abrechnungFilter =
          arrA.includes(checkedCheckboxSec[0]) || checkedCheckboxSec.length == 0
        var arrT = everyMember.therapists.therapieverfahren
        var therapieverfahrenFilter =
          arrT.includes(this.selectedTherapieverfahren) ||
          this.selectedTherapieverfahren == 'Nicht wichtig'
        var arrW = everyMember.therapists.wartezeit
        for (i = 0; i < this.anotherArray.length; i++) {
          this.myFilter = false
          if (arrW === this.anotherArray[i]) {
            this.myFilter = true
            // es muss nur einmal wahr sein
            break
          } else {
            this.myFilter = false
          }
        }
        var wartezeitFilter =
          arrW.includes(this.selectedWartezeit.myText) ||
          this.selectedWartezeit.myText == 'Nicht wichtig' ||
          this.myFilter ||
          this.selectedWartezeit.length == 0
        return (
          abrechnungFilter &&
          patientFilter &&
          therapieverfahrenFilter &&
          wartezeitFilter
        )
      })
      if (this.therapeutenWithoutOrder.length > 0) {
        this.buildAddress()
        this.checkIfUserAddressExists()
        if (this.noAddress) {
          function compare(a, b) {
            if (a.therapists.nachname < b.therapists.nachname) return -1
            if (a.therapists.nachname > b.therapists.nachname) return 1
            return 0
          }
          this.therapeuten = this.therapeutenWithoutOrder.sort(compare)
          this.$store.commit('setTherapeuten', this.therapeuten)
          localStorage.setItem('therapeuten', JSON.stringify(this.therapeuten))
          this.$router.push('/ergebnis')
        } else {
          if (this.postleitzahl[0] === undefined) {
            this.wrongInput = true
            this.noPLZ = true
          } else {
            this.checkAddress()
          }
        }
      } else {
        this.therapeuten = this.therapeutenWithoutOrder
        this.$store.commit('setTherapeuten', this.therapeuten)
        localStorage.setItem('therapeuten', JSON.stringify(this.therapeuten))
        this.$router.push('/ergebnis')
      }
    },
    checkAddress() {
      var myFinalString = this.addresses.toString()
      var userString = this.userAddress.toString()
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metricl&origins=${userString}&destinations=${myFinalString}&key=AIzaSyALtvhlrpPxBMx2C-j_NCIA9wk_qc6gAdg`
      )
        .then(res => res.json())
        .then(data => {
          var realData
          realData = data
          if (realData.origin_addresses[0] !== '') {
            this.distancesText = realData.rows[0].elements.map(
              element => element.distance.text
            )
            this.distancesValue = realData.rows[0].elements.map(
              element => element.distance.value
            )
            var i
            for (i = 0; i < this.therapeutenWithoutOrder.length; i++) {
              this.therapeutenWithoutOrder[
                i
              ].therapists.distanceText = this.distancesText[i]
              this.therapeutenWithoutOrder[
                i
              ].therapists.distanceValue = this.distancesValue[i]
              // adding the properties to my unordered but filtered therapists
            }
            this.therapeuten = this.therapeutenWithoutOrder.sort(
              (fst, snd) =>
                fst.therapists.distanceValue - snd.therapists.distanceValue
            )
            this.$store.commit('setTherapeuten', this.therapeuten)
            localStorage.setItem(
              'therapeuten',
              JSON.stringify(this.therapeuten)
            )
            this.$router.push('/ergebnis')
          } else {
            this.wrongInput = true
          }
        })
    },
    buildAddress() {
      var j
      for (j = 0; j < this.therapeutenWithoutOrder.length; j++) {
        //                    this.addresses.push(this.therapeutenWithoutOrder[j].therapists.adresse)
        this.addresses.push(
          this.therapeutenWithoutOrder[j].therapists.adresse + '|'
        )
      }
      // pushing the addresses of the filtered but unordered therapists into this.addresses
      this.userAddress.push(this.street)
      this.userAddress.push(this.hausnummer)
      this.userAddress.push(this.ort)
      this.userAddress.push(this.postleitzahl)
      // building the user address
    },
    checkIfUserAddressExists() {
      for (var i = 0; i < this.userAddress.length; i++) {
        this.myStatus = false
        if (this.userAddress[i] !== '') {
          break
        } else {
          this.myStatus = true
        }
      }
      if (this.myStatus) {
        this.noAddress = true
      } else {
        this.noAddress = false
      }
    }
  }
}
</script>

<style>
.makeTextRed {
  color: red;
}
.moreMarginBottom {
  margin-bottom: 6vh;
}
</style>