<template>
  <div class="container">
    <PageHeader title="Sponsors" />

    <div class="row">
      <div class="col-lg-12">
      	<p class="lead"> Below are our sponsors that have supported our open source projects!</p>


        <!-- DONATE BUTTON  -->
        <a :href="donate_url" class="btn btn-primary btn-lg" role="button" target="_blank" >Donate</a>

        <br><br>



          <div class="row">
              <div class="col-lg-4 d-flex flex-column align-items-center justify-content-center" v-for="sponsor in sponsors">

                <a :href="sponsor.url" target="_blank">
                  <img class="img-thumbnail" :src="sponsor.logo" :alt="sponsor.alt">
                </a>

                <p class="lead mt-4">
                  {{ sponsor.name }}
                </p>

                <p class='text-center'>
                  {{ sponsor.description }}
                </p>

              </div>
          </div>




     </div>
    </div>
  </div>
</template>

<script>
// TASK - implement sponsors page
// https://github.com/rcos/observatory-client/issues/28
export default {
  name: 'main_sponsors',
  data () {
    return {
      donate_url: 'https://securelb.imodules.com/s/1225/giving/index.aspx?sid=1225&gid=1&pgid=1947&cid=4524&appealcode=WGAFP&_ga=1.191668650.1206279174.1408978267',
      sponsors: [
        { name: 'RedHat', logo: 'http://logo-load.com/uploads/posts/2016-02/1456126060_logo-red-hat.png', alt: 'Red Hat Linux', url: 'https://www.redhat.com/', description: 'RedHat has funded student projects and learning workshops, including Introduction to Open Source Software.' },
        { name: 'Mozilla', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Mozilla_logo.svg/2000px-Mozilla_logo.svg.png', alt: 'Mozilla', url: 'https://www.mozilla.org/en-US/foundation/', description: 'Helped with leadership program for mentors.' },
        { name: 'Open Source Initiative', logo: 'https://opensource.org/files/osi_standard_logo.png', alt: 'Open Source Initiative', url: 'https://opensource.org/', description: 'Educational Institution Member that has provided opportunities for students.' },
        { name: 'NSF HFOSS', logo: 'http://www.hfoss.org/uploads/images/allgray_notrinity.gif', alt: 'HFOSS', url: 'http://www.hfoss.org/index.php/contact-us', description: 'Affliated member with Trinity, Connecticut College and Wesleyan University' },
        { name: 'Microsoft', logo: 'https://mtaiit.com/imgs/microsoft.png', alt: 'Microsoft', url: 'https://www.microsoft.com/en-us/', description: 'Partially Funded Student projects (through Microsoft employee program).' },
        { name: 'Google', logo: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/6466217/fixed-google-logo-font.png', alt: 'Google', url: 'https://www.google.com/', description: 'Donated MAGPis and Cardboard VR.' }
      ]
    }
  }
}
</script>

<style>

.img-thumbnail {
  max-height: 10rem;
}

</style>
