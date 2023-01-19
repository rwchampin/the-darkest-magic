<script setup>
import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'
const nuxtApp = useNuxtApp()
const { $plugins, $appStore } = nuxtApp
const links = ref([{ label: 'Home', id: 0 }, { label: 'About', id: 1 }, { label: 'Experiments', id: 2 }, { id: 3, label: 'Services' }, { id: 4, label: 'Contact' }])
const isVisible = ref(false)
// gsap.registerPlugin(Draggable)
function toggleWidth() {
  if (isVisible.value )
    isVisible.value = 'is-visible'

  else
    isVisible.value = 'not-visible'
}

onMounted(() => {
  Draggable.create('.draggable', { inertia: true, type: 'x,y' })
  gsap.to('.menu-float', { bottom: 33, duration: 1, ease: 'expo' })
  gsap.to('.menu-float li', { stagger: 0.1, scale: 1, ease: 'power2.out' })
})
</script>

<template>
  <div class="menu-float js-menufloat-show style-2" @click="toggleWidth">
    <div class="inner">
      <div class="menu-float--inner">
        <div class="bt-nav bt-nav--left js-gototop" />

        <div :class="menu-float--wrapper draggable is-visible:  isVisible">
          <div class="menu-float--top">
            <div id="menu-main" class="menu-float--menu menu-main">
              <div class="menu-float--menu-content">
                <div class="menu-float--menu--main">
                  <n-grid x-gap="12" :cols="2">
                    <n-gi>
                      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd" clip-rule="evenodd"
                          d="M8.69899 3.08174L7.76441 4.02584L7.75493 4.0258L1.3542 10.4265L0.0117182 9.08405L6.41245 2.68332L8.69707 0.398693L10.0396 1.74118L17.4565 9.15817L16.1159 10.4893L9.66059 4.0339L8.69899 3.08174ZM8.22508 5.69881L10.4911 7.2949L10.5527 21.8672L8.29342 21.8576L8.22508 5.69881Z"
                          fill="white"
                        />
                      </svg>
                    </n-gi>
                    <n-gi>
                      <TheColorModeSwitch />
                    </n-gi>
                  </n-grid>
                  <div class="menu-float--menu-col style-2 is-active">
                    <!-- <ul>
                      <a v-for="link in links" :key="link.id" class="collapsable magnet" :href="link.label">
                        <li>{{ link.label }}</li>
                      </a>
                    </ul> -->
                  </div>
                  <div class="menu-float--menu-col style-1 ">
                    <div class="menu-float--menu-row style-1 ">
                      <div class="menu-float--menu-section">
                        Inspiration
                      </div>
                      <ul class="menu-float--menu-nav">
                        <li>
                          <a href="/collections/" class="menu-float--sub-item">
                            Collections
                          </a>
                        </li>
                        <li>
                          <a href="/elements/" class="menu-float--sub-item">
                            Elements
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="menu-float--menu-row style-1 ">
                      <div class="menu-float--menu-section">
                        Blog
                      </div>
                      <ul class="menu-float--menu-nav">
                        <li>
                          <a href="/blog/" class="menu-float--sub-item">
                            Articles
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="menu-float--menu-col style-1 ">
                    <div class="menu-float--menu-row style-1 ">
                      <div class="menu-float--menu-section">
                        Directory
                      </div>
                      <ul class="menu-float--menu-nav">
                        <li>
                          <a href="/directory/homepage/" class="menu-float--sub-item ">
                            Professionals
                          </a>
                        </li>
                        <li>
                          <a href="/directory/international/" class="menu-float--sub-item">
                            Internationals
                          </a>
                        </li>
                        <li>
                          <a href="/directory/freelance/" class="menu-float--sub-item">
                            Freelancers
                          </a>
                        </li>
                        <li>
                          <a href="/directory/agency-studio/" class="menu-float--sub-item ">
                            Agencies &amp; Studios
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="menu-float--menu-col style-1 ">
                    <div class="menu-float--menu-row style-1 ">
                      <div class="menu-float--menu-section">
                        Academy
                      </div>
                      <ul class="menu-float--menu-nav">
                        <li>
                          <a href="/academy/" class="menu-float--sub-item">
                            Courses
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="menu-float--menu-row style-1 ">
                      <div class="menu-float--menu-section">
                        Jobs &amp; Jury
                      </div>
                      <ul class="menu-float--menu-nav">
                        <li>
                          <a href="/jobs/" class="menu-float--sub-item">
                            Jobs
                          </a>
                        </li>
                        <li>
                          <a href="/official-jury/" class="menu-float--sub-item ">
                            Jury
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="menu-filters" class="menu-float--menu">
              <div class="menu-float--menu-content">
                <div class="filters">
                  <div id="filter-winners-award" class="filters--tab" data-controller="searchable-filter">
                    <div class="filters--content" data-searchable-filter-target="filters">
                      <div class="js-filter-section">
                        <div class="filters--label">
                          award
                        </div>
                        <ul class="filters--list">
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;award=sites_of_the_day" class="filters--item ">
                              <span class="js-filter-item-name">Sites of the Day</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;award=sites_of_the_month" class="filters--item ">
                              <span class="js-filter-item-name">Sites of the Month</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;award=sites_of_the_year" class="filters--item ">
                              <span class="js-filter-item-name">Sites of the Year</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;award=developer" class="filters--item ">
                              <span class="js-filter-item-name">Developer</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;award=mobile_excellence" class="filters--item ">
                              <span class="js-filter-item-name">Mobile Excellence</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;award=honorable" class="filters--item ">
                              <span class="js-filter-item-name">Honorable</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;award=nominees" class="filters--item ">
                              <span class="js-filter-item-name">Nominees</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div id="filter-winners-popular" class="filters--tab" data-controller="searchable-filter">
                    <div class="filters--search">
                      <input
                        type="text" class="js-input-filter-search" placeholder="Search ..."
                        data-searchable-filter-target="input" data-action="keyup->searchable-filter#searchEvent"
                      >
                      <button type="submit" data-action="click->searchable-filter#doSearch">
                        <svg class="ico-svg" viewBox="0 0 20 20" width="17" />
                      </button>
                    </div>

                    <div class="filters--content" data-searchable-filter-target="filters">
                      <div class="js-filter-section">
                        <div class="filters--label">
                          category
                        </div>
                        <ul class="filters--list">
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=architecture" class="filters--item ">
                              <span class="js-filter-item-name">Architecture</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=art-illustration" class="filters--item ">
                              <span class="js-filter-item-name">Art &amp; Illustration</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=business-corporate" class="filters--item ">
                              <span class="js-filter-item-name">Business &amp;
                                Corporate</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=culture-education" class="filters--item ">
                              <span class="js-filter-item-name">Culture &amp; Education</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=design-agencies" class="filters--item ">
                              <span class="js-filter-item-name">Design Agencies</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=e-commerce" class="filters--item ">
                              <span class="js-filter-item-name">E-Commerce</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=events" class="filters--item ">
                              <span class="js-filter-item-name">Events</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=experimental" class="filters--item ">
                              <span class="js-filter-item-name">Experimental</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=fashion" class="filters--item ">
                              <span class="js-filter-item-name">Fashion</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=film-tv" class="filters--item ">
                              <span class="js-filter-item-name">Film &amp; TV</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=food-drink" class="filters--item ">
                              <span class="js-filter-item-name">Food &amp; Drink</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=games-entertainment" class="filters--item ">
                              <span class="js-filter-item-name">Games &amp;
                                Entertainment</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=hotel-restaurant" class="filters--item ">
                              <span class="js-filter-item-name">Hotel / Restaurant</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=institutions" class="filters--item ">
                              <span class="js-filter-item-name">Institutions</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a
                              href="/websites/?tag=portfolio&amp;category=magazine-newspaper-blog"
                              class="filters--item "
                            >
                              <span class="js-filter-item-name">Magazine / Newspaper /
                                Blog</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=mobile-apps" class="filters--item ">
                              <span class="js-filter-item-name">Mobile &amp; Apps</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=music-sound" class="filters--item ">
                              <span class="js-filter-item-name">Music &amp; Sound</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=other" class="filters--item ">
                              <span class="js-filter-item-name">Other</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=photography" class="filters--item ">
                              <span class="js-filter-item-name">Photography</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=promotional" class="filters--item ">
                              <span class="js-filter-item-name">Promotional</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=real-estate" class="filters--item ">
                              <span class="js-filter-item-name">Real Estate</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a
                              href="/websites/?tag=portfolio&amp;category=social-responsibility"
                              class="filters--item "
                            >
                              <span class="js-filter-item-name">Social responsibility</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=sports" class="filters--item ">
                              <span class="js-filter-item-name">Sports</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=startups" class="filters--item ">
                              <span class="js-filter-item-name">Startups</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=technology" class="filters--item ">
                              <span class="js-filter-item-name">Technology</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;category=web-interactive" class="filters--item ">
                              <span class="js-filter-item-name">Web &amp; Interactive</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="js-filter-section">
                        <div class="filters--label">
                          tag
                        </div>
                        <ul class="filters--list">
                          <li class="js-filter-item">
                            <a href="/websites/" class="filters--item is-active">
                              <span class="js-filter-item-name">Portfolio</span>
                              <svg class="ico-svg" viewBox="0 0 20 20" width="7">
                                <use xlink:href="#ico-close" />
                              </svg>

                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/360/" class="filters--item ">
                              <span class="js-filter-item-name">360</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/3d/" class="filters--item ">
                              <span class="js-filter-item-name">3D</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/404-pages/" class="filters--item ">
                              <span class="js-filter-item-name">404 pages</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/about-page/" class="filters--item ">
                              <span class="js-filter-item-name">About Page</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/animation/" class="filters--item ">
                              <span class="js-filter-item-name">Animation</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/app-style/" class="filters--item ">
                              <span class="js-filter-item-name">App Style</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/big-background-images/" class="filters--item ">
                              <span class="js-filter-item-name">Big Background Images</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/clean/" class="filters--item ">
                              <span class="js-filter-item-name">Clean</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/colorful/" class="filters--item ">
                              <span class="js-filter-item-name">Colorful</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/contact-page/" class="filters--item ">
                              <span class="js-filter-item-name">Contact Page</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/content-architecture/" class="filters--item ">
                              <span class="js-filter-item-name">Content architecture</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/contentful/" class="filters--item ">
                              <span class="js-filter-item-name">Contentful</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/copy-design/" class="filters--item ">
                              <span class="js-filter-item-name">Copy design</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/data-visualization/" class="filters--item ">
                              <span class="js-filter-item-name">Data Visualization</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/filters-and-effects/" class="filters--item ">
                              <span class="js-filter-item-name">Filters and Effects</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/flat-design/" class="filters--item ">
                              <span class="js-filter-item-name">Flat Design</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/footer-design/" class="filters--item ">
                              <span class="js-filter-item-name">Footer Design</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/forms-and-input/" class="filters--item ">
                              <span class="js-filter-item-name">Forms and Input</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/fullscreen/" class="filters--item ">
                              <span class="js-filter-item-name">Fullscreen</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/gallery/" class="filters--item ">
                              <span class="js-filter-item-name">Gallery</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/gestures-interaction/" class="filters--item ">
                              <span class="js-filter-item-name">Gestures / Interaction</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/graphic-design/" class="filters--item ">
                              <span class="js-filter-item-name">Graphic design</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/header-design/" class="filters--item ">
                              <span class="js-filter-item-name">Header Design</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/horizontal-layout/" class="filters--item ">
                              <span class="js-filter-item-name">Horizontal Layout</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/icons/" class="filters--item ">
                              <span class="js-filter-item-name">Icons</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/illustration/" class="filters--item ">
                              <span class="js-filter-item-name">Illustration</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/infinite-scroll/" class="filters--item ">
                              <span class="js-filter-item-name">Infinite Scroll</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/interaction-design/" class="filters--item ">
                              <span class="js-filter-item-name">Interaction Design</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/menu-horizontal/" class="filters--item ">
                              <span class="js-filter-item-name">Menu - Horizontal</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/menu-vertical/" class="filters--item ">
                              <span class="js-filter-item-name">Menu - Vertical</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/microinteractions/" class="filters--item ">
                              <span class="js-filter-item-name">Microinteractions</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/minimal/" class="filters--item ">
                              <span class="js-filter-item-name">Minimal</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/navigation/" class="filters--item ">
                              <span class="js-filter-item-name">Navigation Menu</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/parallax/" class="filters--item ">
                              <span class="js-filter-item-name">Parallax</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/photo-video/" class="filters--item ">
                              <span class="js-filter-item-name">Photo &amp; Video</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/photography-sites/" class="filters--item ">
                              <span class="js-filter-item-name">Photography</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/project-page/" class="filters--item ">
                              <span class="js-filter-item-name">Project Page</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/responsive/" class="filters--item ">
                              <span class="js-filter-item-name">Responsive</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/responsive-design/" class="filters--item ">
                              <span class="js-filter-item-name">Responsive Design</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/retro/" class="filters--item ">
                              <span class="js-filter-item-name">Retro</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/seo-1/" class="filters--item ">
                              <span class="js-filter-item-name">SEO</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/scrolling/" class="filters--item ">
                              <span class="js-filter-item-name">Scrolling</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/single-page/" class="filters--item ">
                              <span class="js-filter-item-name">Single page</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/social-integration/" class="filters--item ">
                              <span class="js-filter-item-name">Social Integration</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/sound-audio/" class="filters--item ">
                              <span class="js-filter-item-name">Sound-Audio</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/storytelling/" class="filters--item ">
                              <span class="js-filter-item-name">Storytelling</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/transitions/" class="filters--item ">
                              <span class="js-filter-item-name">Transitions</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/typography/" class="filters--item ">
                              <span class="js-filter-item-name">Typography</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/ui-design/" class="filters--item ">
                              <span class="js-filter-item-name">UI design</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/unusual-navigation/" class="filters--item ">
                              <span class="js-filter-item-name">Unusual Navigation</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/vector/" class="filters--item ">
                              <span class="js-filter-item-name">Vector</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/video/" class="filters--item ">
                              <span class="js-filter-item-name">Video</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/web-fonts/" class="filters--item ">
                              <span class="js-filter-item-name">Web Fonts</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/next-js/" class="filters--item ">
                              <span class="js-filter-item-name">next.js</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="js-filter-section">
                        <div class="filters--label">
                          technology
                        </div>
                        <ul class="filters--list">
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=11ty" class="filters--item ">
                              <span class="js-filter-item-name">11ty</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=aws" class="filters--item ">
                              <span class="js-filter-item-name">AWS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=illustrator" class="filters--item ">
                              <span class="js-filter-item-name">Adobe Illustrator</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=photoshop" class="filters--item ">
                              <span class="js-filter-item-name">Adobe Photoshop</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=adobe-xd" class="filters--item ">
                              <span class="js-filter-item-name">Adobe XD</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=after-effects" class="filters--item ">
                              <span class="js-filter-item-name">After Effects</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=angularjs" class="filters--item ">
                              <span class="js-filter-item-name">Angular</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=anime-js" class="filters--item ">
                              <span class="js-filter-item-name">Anime.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=barba-js" class="filters--item ">
                              <span class="js-filter-item-name">BARBA.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=backbone-js" class="filters--item ">
                              <span class="js-filter-item-name">Backbone.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=blender" class="filters--item ">
                              <span class="js-filter-item-name">Blender</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=bootstrap" class="filters--item ">
                              <span class="js-filter-item-name">Bootstrap</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=css3" class="filters--item ">
                              <span class="js-filter-item-name">CSS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=canvas-api" class="filters--item ">
                              <span class="js-filter-item-name">Canvas API</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=cinema-4d" class="filters--item ">
                              <span class="js-filter-item-name">Cinema 4D</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=contentful" class="filters--item ">
                              <span class="js-filter-item-name">Contentful</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=craft-cms" class="filters--item ">
                              <span class="js-filter-item-name">Craft CMS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=createjs" class="filters--item ">
                              <span class="js-filter-item-name">CreateJS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=curtains" class="filters--item ">
                              <span class="js-filter-item-name">Curtains.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=d3" class="filters--item ">
                              <span class="js-filter-item-name">D3</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=datocms" class="filters--item ">
                              <span class="js-filter-item-name">DatoCMS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=debian" class="filters--item ">
                              <span class="js-filter-item-name">Debian</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=demandware" class="filters--item ">
                              <span class="js-filter-item-name">Demandware</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=directus" class="filters--item ">
                              <span class="js-filter-item-name">Directus</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=docker" class="filters--item ">
                              <span class="js-filter-item-name">Docker</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=drupal" class="filters--item ">
                              <span class="js-filter-item-name">Drupal</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=editor-x" class="filters--item ">
                              <span class="js-filter-item-name">Editor X</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=elementor" class="filters--item ">
                              <span class="js-filter-item-name">Elementor</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=express" class="filters--item ">
                              <span class="js-filter-item-name">Express</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=fastclick" class="filters--item ">
                              <span class="js-filter-item-name">FastClick</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=figma" class="filters--item ">
                              <span class="js-filter-item-name">Figma</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=firebase" class="filters--item ">
                              <span class="js-filter-item-name">Firebase</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=flickity" class="filters--item ">
                              <span class="js-filter-item-name">Flickity</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=font-awesome" class="filters--item ">
                              <span class="js-filter-item-name">Font Awesome</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=framer-motion" class="filters--item ">
                              <span class="js-filter-item-name">Framer Motion</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=glsl" class="filters--item ">
                              <span class="js-filter-item-name">GLSL</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=gsap-animation" class="filters--item ">
                              <span class="js-filter-item-name">GSAP Animation</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=gatsby" class="filters--item ">
                              <span class="js-filter-item-name">Gatsby</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=google-app-engine" class="filters--item ">
                              <span class="js-filter-item-name">Google App Engine</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=google-font-api" class="filters--item ">
                              <span class="js-filter-item-name">Google Font API</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=graphql" class="filters--item ">
                              <span class="js-filter-item-name">GraphQL</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=html5" class="filters--item ">
                              <span class="js-filter-item-name">HTML5</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=hammer-js" class="filters--item ">
                              <span class="js-filter-item-name">Hammer.JS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=handlebars" class="filters--item ">
                              <span class="js-filter-item-name">Handlebars</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=highway-js" class="filters--item ">
                              <span class="js-filter-item-name">Highway.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=javascript" class="filters--item ">
                              <span class="js-filter-item-name">Javascript</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=lambda" class="filters--item ">
                              <span class="js-filter-item-name">Lambda</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=laravel" class="filters--item ">
                              <span class="js-filter-item-name">Laravel</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=lo-dash" class="filters--item ">
                              <span class="js-filter-item-name">Lo-dash</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=locomotive-scroll" class="filters--item ">
                              <span class="js-filter-item-name">Locomotive Scroll</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=lottie" class="filters--item ">
                              <span class="js-filter-item-name">Lottie</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=magento" class="filters--item ">
                              <span class="js-filter-item-name">Magento</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=matterjs" class="filters--item ">
                              <span class="js-filter-item-name">Matter.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=modernizr" class="filters--item ">
                              <span class="js-filter-item-name">Modernizr</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=morphic" class="filters--item ">
                              <span class="js-filter-item-name">Morphic</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=neos-cms" class="filters--item ">
                              <span class="js-filter-item-name">Neos CMS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=netlify" class="filters--item ">
                              <span class="js-filter-item-name">Netlify</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=next-js" class="filters--item ">
                              <span class="js-filter-item-name">Next.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=nginx" class="filters--item ">
                              <span class="js-filter-item-name">Nginx</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=node-js" class="filters--item ">
                              <span class="js-filter-item-name">Node.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=nuxt-js" class="filters--item ">
                              <span class="js-filter-item-name">Nuxt.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=owl-carousel" class="filters--item ">
                              <span class="js-filter-item-name">OWL Carousel</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=p5js" class="filters--item ">
                              <span class="js-filter-item-name">P5.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=php" class="filters--item ">
                              <span class="js-filter-item-name">PHP</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=pwa" class="filters--item ">
                              <span class="js-filter-item-name">PWA</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=pixijs" class="filters--item ">
                              <span class="js-filter-item-name">PixiJS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=prestashop" class="filters--item ">
                              <span class="js-filter-item-name">Prestashop</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=prismic" class="filters--item ">
                              <span class="js-filter-item-name">Prismic</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=python" class="filters--item ">
                              <span class="js-filter-item-name">Python</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=react" class="filters--item ">
                              <span class="js-filter-item-name">React</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=readymag" class="filters--item ">
                              <span class="js-filter-item-name">Readymag</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=redux" class="filters--item ">
                              <span class="js-filter-item-name">Redux</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=rellax-js" class="filters--item ">
                              <span class="js-filter-item-name">Rellax.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=requirejs" class="filters--item ">
                              <span class="js-filter-item-name">RequireJS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=reveal-js" class="filters--item ">
                              <span class="js-filter-item-name">Reveal.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=ruby" class="filters--item ">
                              <span class="js-filter-item-name">Ruby</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=svg" class="filters--item ">
                              <span class="js-filter-item-name">SVG</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=sanity" class="filters--item ">
                              <span class="js-filter-item-name">Sanity</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=sass" class="filters--item ">
                              <span class="js-filter-item-name">Sass</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=shopify" class="filters--item ">
                              <span class="js-filter-item-name">Shopify</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=sketchapp" class="filters--item ">
                              <span class="js-filter-item-name">Sketch</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=skrollr-js" class="filters--item ">
                              <span class="js-filter-item-name">Skrollr.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=snap-svg" class="filters--item ">
                              <span class="js-filter-item-name">Snap.svg</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=svelte" class="filters--item ">
                              <span class="js-filter-item-name">Svelte</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=swiper" class="filters--item ">
                              <span class="js-filter-item-name">Swiper.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=tailwind" class="filters--item ">
                              <span class="js-filter-item-name">Tailwind CSS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=three-js" class="filters--item ">
                              <span class="js-filter-item-name">Three.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=tilda" class="filters--item ">
                              <span class="js-filter-item-name">Tilda</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=timber" class="filters--item ">
                              <span class="js-filter-item-name">Timber</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=twitter-api" class="filters--item ">
                              <span class="js-filter-item-name">Twitter API</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=typekit" class="filters--item ">
                              <span class="js-filter-item-name">Typekit</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=typescript" class="filters--item ">
                              <span class="js-filter-item-name">Typescript</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=underscore-js" class="filters--item ">
                              <span class="js-filter-item-name">Underscore.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=unity" class="filters--item ">
                              <span class="js-filter-item-name">Unity</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=vr" class="filters--item ">
                              <span class="js-filter-item-name">VR</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=vanilla-js" class="filters--item ">
                              <span class="js-filter-item-name">Vanilla JS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=varnish" class="filters--item ">
                              <span class="js-filter-item-name">Varnish</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=velocity-js" class="filters--item ">
                              <span class="js-filter-item-name">Velocity.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=vercel" class="filters--item ">
                              <span class="js-filter-item-name">Vercel</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=videojs" class="filters--item ">
                              <span class="js-filter-item-name">VideoJS</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=vue-js" class="filters--item ">
                              <span class="js-filter-item-name">Vue.js</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=webgl" class="filters--item ">
                              <span class="js-filter-item-name">WebGL</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=websockets" class="filters--item ">
                              <span class="js-filter-item-name">WebSockets</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=webvr" class="filters--item ">
                              <span class="js-filter-item-name">WebVR</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=webflow" class="filters--item ">
                              <span class="js-filter-item-name">Webflow</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=webpack" class="filters--item ">
                              <span class="js-filter-item-name">Webpack</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=woocommerce" class="filters--item ">
                              <span class="js-filter-item-name">WooCommerce</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=wordpress" class="filters--item ">
                              <span class="js-filter-item-name">Wordpress</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=yepnope" class="filters--item ">
                              <span class="js-filter-item-name">Yepnope</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=youtube-api" class="filters--item ">
                              <span class="js-filter-item-name">YouTube API</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=zepto" class="filters--item ">
                              <span class="js-filter-item-name">Zepto</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=jquery" class="filters--item ">
                              <span class="js-filter-item-name">jQuery</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;technology=tween-js" class="filters--item ">
                              <span class="js-filter-item-name">tween.js</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div id="filter-winners-country" class="filters--tab" data-controller="searchable-filter">
                    <div class="filters--search">
                      <input
                        type="text" class="js-input-filter-search" placeholder="Search ..."
                        data-searchable-filter-target="input" data-action="keyup->searchable-filter#searchEvent"
                      >
                      <button type="submit" data-action="click->searchable-filter#doSearch">
                        <svg class="ico-svg" viewBox="0 0 20 20" width="17" />
                      </button>
                    </div>

                    <div class="filters--content" data-searchable-filter-target="filters">
                      <div class="js-filter-section">
                        <div class="filters--label">
                          country
                        </div>
                        <ul class="filters--list">
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=United%20States" class="filters--item ">
                              <span class="js-filter-item-name">United States</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=France" class="filters--item ">
                              <span class="js-filter-item-name">France</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=United%20Kingdom" class="filters--item ">
                              <span class="js-filter-item-name">United Kingdom</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Germany" class="filters--item ">
                              <span class="js-filter-item-name">Germany</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Italy" class="filters--item ">
                              <span class="js-filter-item-name">Italy</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Canada" class="filters--item ">
                              <span class="js-filter-item-name">Canada</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Netherlands" class="filters--item ">
                              <span class="js-filter-item-name">Netherlands</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Russia" class="filters--item ">
                              <span class="js-filter-item-name">Russia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Australia" class="filters--item ">
                              <span class="js-filter-item-name">Australia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Spain" class="filters--item ">
                              <span class="js-filter-item-name">Spain</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Japan" class="filters--item ">
                              <span class="js-filter-item-name">Japan</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Ukraine" class="filters--item ">
                              <span class="js-filter-item-name">Ukraine</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Poland" class="filters--item ">
                              <span class="js-filter-item-name">Poland</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Switzerland" class="filters--item ">
                              <span class="js-filter-item-name">Switzerland</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Belgium" class="filters--item ">
                              <span class="js-filter-item-name">Belgium</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Brazil" class="filters--item ">
                              <span class="js-filter-item-name">Brazil</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=India" class="filters--item ">
                              <span class="js-filter-item-name">India</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Sweden" class="filters--item ">
                              <span class="js-filter-item-name">Sweden</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Portugal" class="filters--item ">
                              <span class="js-filter-item-name">Portugal</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Austria" class="filters--item ">
                              <span class="js-filter-item-name">Austria</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Denmark" class="filters--item ">
                              <span class="js-filter-item-name">Denmark</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Romania" class="filters--item ">
                              <span class="js-filter-item-name">Romania</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=New%20Zealand" class="filters--item ">
                              <span class="js-filter-item-name">New Zealand</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Greece" class="filters--item ">
                              <span class="js-filter-item-name">Greece</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Czech%20Republic" class="filters--item ">
                              <span class="js-filter-item-name">Czech Republic</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Israel" class="filters--item ">
                              <span class="js-filter-item-name">Israel</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Norway" class="filters--item ">
                              <span class="js-filter-item-name">Norway</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Serbia" class="filters--item ">
                              <span class="js-filter-item-name">Serbia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Croatia" class="filters--item ">
                              <span class="js-filter-item-name">Croatia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=South%20Korea" class="filters--item ">
                              <span class="js-filter-item-name">South Korea</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Slovakia" class="filters--item ">
                              <span class="js-filter-item-name">Slovakia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a
                              href="/websites/?tag=portfolio&amp;country=United%20Arab%20Emirates"
                              class="filters--item "
                            >
                              <span class="js-filter-item-name">United Arab Emirates</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=South%20Africa" class="filters--item ">
                              <span class="js-filter-item-name">South Africa</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Turkey" class="filters--item ">
                              <span class="js-filter-item-name">Turkey</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=China" class="filters--item ">
                              <span class="js-filter-item-name">China</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Ireland" class="filters--item ">
                              <span class="js-filter-item-name">Ireland</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Singapore" class="filters--item ">
                              <span class="js-filter-item-name">Singapore</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Lithuania" class="filters--item ">
                              <span class="js-filter-item-name">Lithuania</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Argentina" class="filters--item ">
                              <span class="js-filter-item-name">Argentina</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Bulgaria" class="filters--item ">
                              <span class="js-filter-item-name">Bulgaria</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Georgia" class="filters--item ">
                              <span class="js-filter-item-name">Georgia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Mexico" class="filters--item ">
                              <span class="js-filter-item-name">Mexico</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Philippines" class="filters--item ">
                              <span class="js-filter-item-name">Philippines</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Finland" class="filters--item ">
                              <span class="js-filter-item-name">Finland</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Slovenia" class="filters--item ">
                              <span class="js-filter-item-name">Slovenia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Chile" class="filters--item ">
                              <span class="js-filter-item-name">Chile</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a
                              href="/websites/?tag=portfolio&amp;country=Hong%20Kong%20-%20Macau"
                              class="filters--item "
                            >
                              <span class="js-filter-item-name">Hong Kong - Macau</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Latvia" class="filters--item ">
                              <span class="js-filter-item-name">Latvia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Hungary" class="filters--item ">
                              <span class="js-filter-item-name">Hungary</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Vietnam" class="filters--item ">
                              <span class="js-filter-item-name">Vietnam</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Estonia" class="filters--item ">
                              <span class="js-filter-item-name">Estonia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Taiwan" class="filters--item ">
                              <span class="js-filter-item-name">Taiwan</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Bangladesh" class="filters--item ">
                              <span class="js-filter-item-name">Bangladesh</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Belarus" class="filters--item ">
                              <span class="js-filter-item-name">Belarus</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Colombia" class="filters--item ">
                              <span class="js-filter-item-name">Colombia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Cyprus" class="filters--item ">
                              <span class="js-filter-item-name">Cyprus</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Indonesia" class="filters--item ">
                              <span class="js-filter-item-name">Indonesia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Luxembourg" class="filters--item ">
                              <span class="js-filter-item-name">Luxembourg</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Moldova" class="filters--item ">
                              <span class="js-filter-item-name">Moldova</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Thailand" class="filters--item ">
                              <span class="js-filter-item-name">Thailand</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Nigeria" class="filters--item ">
                              <span class="js-filter-item-name">Nigeria</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Iceland" class="filters--item ">
                              <span class="js-filter-item-name">Iceland</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Lebanon" class="filters--item ">
                              <span class="js-filter-item-name">Lebanon</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Malaysia" class="filters--item ">
                              <span class="js-filter-item-name">Malaysia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Uruguay" class="filters--item ">
                              <span class="js-filter-item-name">Uruguay</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Armenia" class="filters--item ">
                              <span class="js-filter-item-name">Armenia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Egypt" class="filters--item ">
                              <span class="js-filter-item-name">Egypt</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Iran" class="filters--item ">
                              <span class="js-filter-item-name">Iran</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Kosovo" class="filters--item ">
                              <span class="js-filter-item-name">Kosovo</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Malta" class="filters--item ">
                              <span class="js-filter-item-name">Malta</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Morocco" class="filters--item ">
                              <span class="js-filter-item-name">Morocco</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Pakistan" class="filters--item ">
                              <span class="js-filter-item-name">Pakistan</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Ecuador" class="filters--item ">
                              <span class="js-filter-item-name">Ecuador</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Kazakhstan" class="filters--item ">
                              <span class="js-filter-item-name">Kazakhstan</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Saudi%20Arabia" class="filters--item ">
                              <span class="js-filter-item-name">Saudi Arabia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Bahrain" class="filters--item ">
                              <span class="js-filter-item-name">Bahrain</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Peru" class="filters--item ">
                              <span class="js-filter-item-name">Peru</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Albania" class="filters--item ">
                              <span class="js-filter-item-name">Albania</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Barbados" class="filters--item ">
                              <span class="js-filter-item-name">Barbados</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Kenya" class="filters--item ">
                              <span class="js-filter-item-name">Kenya</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Monaco" class="filters--item ">
                              <span class="js-filter-item-name">Monaco</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=New%20Caledonia" class="filters--item ">
                              <span class="js-filter-item-name">New Caledonia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Panama" class="filters--item ">
                              <span class="js-filter-item-name">Panama</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Afghanistan" class="filters--item ">
                              <span class="js-filter-item-name">Afghanistan</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Algeria" class="filters--item ">
                              <span class="js-filter-item-name">Algeria</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Azerbaijan" class="filters--item ">
                              <span class="js-filter-item-name">Azerbaijan</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Bermuda" class="filters--item ">
                              <span class="js-filter-item-name">Bermuda</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a
                              href="/websites/?tag=portfolio&amp;country=Bosnia%20and%20Herzegovina"
                              class="filters--item "
                            >
                              <span class="js-filter-item-name">Bosnia and Herzegovina</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Cuba" class="filters--item ">
                              <span class="js-filter-item-name">Cuba</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Ghana" class="filters--item ">
                              <span class="js-filter-item-name">Ghana</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Guatemala" class="filters--item ">
                              <span class="js-filter-item-name">Guatemala</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Honduras" class="filters--item ">
                              <span class="js-filter-item-name">Honduras</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Mauritius%20Island" class="filters--item ">
                              <span class="js-filter-item-name">Mauritius Island</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Montenegro" class="filters--item ">
                              <span class="js-filter-item-name">Montenegro</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Myanmar" class="filters--item ">
                              <span class="js-filter-item-name">Myanmar</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Nepal" class="filters--item ">
                              <span class="js-filter-item-name">Nepal</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=North%20Korea" class="filters--item ">
                              <span class="js-filter-item-name">North Korea</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Syria" class="filters--item ">
                              <span class="js-filter-item-name">Syria</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Tanzania" class="filters--item ">
                              <span class="js-filter-item-name">Tanzania</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;country=Venezuela" class="filters--item ">
                              <span class="js-filter-item-name">Venezuela</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div id="filter-winners-typography" class="filters--tab" data-controller="searchable-filter">
                    <div class="filters--search">
                      <input
                        type="text" class="js-input-filter-search" placeholder="Search ..."
                        data-searchable-filter-target="input" data-action="keyup->searchable-filter#searchEvent"
                      >
                      <button type="submit" data-action="click->searchable-filter#doSearch">
                        <svg class="ico-svg" viewBox="0 0 20 20" width="17" />
                      </button>
                    </div>

                    <div class="filters--content" data-searchable-filter-target="filters">
                      <div class="js-filter-section">
                        <div class="filters--label">
                          typography
                        </div>
                        <ul class="filters--list">
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Inter" class="filters--item ">
                              <span class="js-filter-item-name">Inter</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Helvetica" class="filters--item ">
                              <span class="js-filter-item-name">Helvetica</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Mont" class="filters--item ">
                              <span class="js-filter-item-name">Mont</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Poppins" class="filters--item ">
                              <span class="js-filter-item-name">Poppins</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=GT" class="filters--item ">
                              <span class="js-filter-item-name">GT</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Neue%20Montreal" class="filters--item ">
                              <span class="js-filter-item-name">Neue Montreal</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Neue%20Haas" class="filters--item ">
                              <span class="js-filter-item-name">Neue Haas</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Open" class="filters--item ">
                              <span class="js-filter-item-name">Open</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=PP" class="filters--item ">
                              <span class="js-filter-item-name">PP</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Monument" class="filters--item ">
                              <span class="js-filter-item-name">Monument</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Lato" class="filters--item ">
                              <span class="js-filter-item-name">Lato</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Arial" class="filters--item ">
                              <span class="js-filter-item-name">Arial</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=DM" class="filters--item ">
                              <span class="js-filter-item-name">DM</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Noto" class="filters--item ">
                              <span class="js-filter-item-name">Noto</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Canela" class="filters--item ">
                              <span class="js-filter-item-name">Canela</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Circular" class="filters--item ">
                              <span class="js-filter-item-name">Circular</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Manrope" class="filters--item ">
                              <span class="js-filter-item-name">Manrope</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=DIN" class="filters--item ">
                              <span class="js-filter-item-name">DIN</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Graphik" class="filters--item ">
                              <span class="js-filter-item-name">Graphik</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Proxima" class="filters--item ">
                              <span class="js-filter-item-name">Proxima</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Avenir" class="filters--item ">
                              <span class="js-filter-item-name">Avenir</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Fa" class="filters--item ">
                              <span class="js-filter-item-name">Fa</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=IBM" class="filters--item ">
                              <span class="js-filter-item-name">IBM</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Icon" class="filters--item ">
                              <span class="js-filter-item-name">Icon</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Cormorant" class="filters--item ">
                              <span class="js-filter-item-name">Cormorant</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Material" class="filters--item ">
                              <span class="js-filter-item-name">Material</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Migra" class="filters--item ">
                              <span class="js-filter-item-name">Migra</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Oswald" class="filters--item ">
                              <span class="js-filter-item-name">Oswald</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Archivo" class="filters--item ">
                              <span class="js-filter-item-name">Archivo</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Clash" class="filters--item ">
                              <span class="js-filter-item-name">Clash</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Domaine" class="filters--item ">
                              <span class="js-filter-item-name">Domaine</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Founders" class="filters--item ">
                              <span class="js-filter-item-name">Founders</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Nunito" class="filters--item ">
                              <span class="js-filter-item-name">Nunito</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=ABC" class="filters--item ">
                              <span class="js-filter-item-name">ABC</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Almarena" class="filters--item ">
                              <span class="js-filter-item-name">Almarena</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Apercu" class="filters--item ">
                              <span class="js-filter-item-name">Apercu</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Libre" class="filters--item ">
                              <span class="js-filter-item-name">Libre</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Moderat" class="filters--item ">
                              <span class="js-filter-item-name">Moderat</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Ano" class="filters--item ">
                              <span class="js-filter-item-name">Ano</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Basis" class="filters--item ">
                              <span class="js-filter-item-name">Basis</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Degular" class="filters--item ">
                              <span class="js-filter-item-name">Degular</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Gilroy" class="filters--item ">
                              <span class="js-filter-item-name">Gilroy</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Gotham" class="filters--item ">
                              <span class="js-filter-item-name">Gotham</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Lora" class="filters--item ">
                              <span class="js-filter-item-name">Lora</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Neue%20Machina" class="filters--item ">
                              <span class="js-filter-item-name">Neue Machina</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Neuzeit" class="filters--item ">
                              <span class="js-filter-item-name">Neuzeit</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Playfair" class="filters--item ">
                              <span class="js-filter-item-name">Playfair</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Acumin" class="filters--item ">
                              <span class="js-filter-item-name">Acumin</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Aeonik" class="filters--item ">
                              <span class="js-filter-item-name">Aeonik</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Aktiv" class="filters--item ">
                              <span class="js-filter-item-name">Aktiv</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Editorial%20New" class="filters--item ">
                              <span class="js-filter-item-name">Editorial New</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Exo" class="filters--item ">
                              <span class="js-filter-item-name">Exo</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Fira" class="filters--item ">
                              <span class="js-filter-item-name">Fira</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Freight" class="filters--item ">
                              <span class="js-filter-item-name">Freight</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Futura" class="filters--item ">
                              <span class="js-filter-item-name">Futura</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Grandslang" class="filters--item ">
                              <span class="js-filter-item-name">Grandslang</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=ITC" class="filters--item ">
                              <span class="js-filter-item-name">ITC</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Inconsolata" class="filters--item ">
                              <span class="js-filter-item-name">Inconsolata</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Muli" class="filters--item ">
                              <span class="js-filter-item-name">Muli</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Polysans" class="filters--item ">
                              <span class="js-filter-item-name">Polysans</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Austin" class="filters--item ">
                              <span class="js-filter-item-name">Austin</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Barlow" class="filters--item ">
                              <span class="js-filter-item-name">Barlow</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Comfortaa" class="filters--item ">
                              <span class="js-filter-item-name">Comfortaa</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Druk" class="filters--item ">
                              <span class="js-filter-item-name">Druk</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Everett" class="filters--item ">
                              <span class="js-filter-item-name">Everett</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Lausanne" class="filters--item ">
                              <span class="js-filter-item-name">Lausanne</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Maison" class="filters--item ">
                              <span class="js-filter-item-name">Maison</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Merriweather" class="filters--item ">
                              <span class="js-filter-item-name">Merriweather</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Press%20Start%202P" class="filters--item ">
                              <span class="js-filter-item-name">Press Start 2P</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=AT" class="filters--item ">
                              <span class="js-filter-item-name">AT</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Akzidenz" class="filters--item ">
                              <span class="js-filter-item-name">Akzidenz</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Amatic%20SC" class="filters--item ">
                              <span class="js-filter-item-name">Amatic SC</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Assistant" class="filters--item ">
                              <span class="js-filter-item-name">Assistant</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Baskerville" class="filters--item ">
                              <span class="js-filter-item-name">Baskerville</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Baskervville" class="filters--item ">
                              <span class="js-filter-item-name">Baskervville</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Bebas" class="filters--item ">
                              <span class="js-filter-item-name">Bebas</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Brown" class="filters--item ">
                              <span class="js-filter-item-name">Brown</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Calibre" class="filters--item ">
                              <span class="js-filter-item-name">Calibre</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Cambon" class="filters--item ">
                              <span class="js-filter-item-name">Cambon</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Cardo" class="filters--item ">
                              <span class="js-filter-item-name">Cardo</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Cooper" class="filters--item ">
                              <span class="js-filter-item-name">Cooper</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Dosis" class="filters--item ">
                              <span class="js-filter-item-name">Dosis</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Droid%20Serif" class="filters--item ">
                              <span class="js-filter-item-name">Droid Serif</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=EB%20Garamond" class="filters--item ">
                              <span class="js-filter-item-name">EB Garamond</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Epilogue" class="filters--item ">
                              <span class="js-filter-item-name">Epilogue</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=FK" class="filters--item ">
                              <span class="js-filter-item-name">FK</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Favorit" class="filters--item ">
                              <span class="js-filter-item-name">Favorit</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Feijoa" class="filters--item ">
                              <span class="js-filter-item-name">Feijoa</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Formula" class="filters--item ">
                              <span class="js-filter-item-name">Formula</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Formular" class="filters--item ">
                              <span class="js-filter-item-name">Formular</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=General%20Sans" class="filters--item ">
                              <span class="js-filter-item-name">General Sans</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=HK%20Grotesk" class="filters--item ">
                              <span class="js-filter-item-name">HK Grotesk</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Heebo" class="filters--item ">
                              <span class="js-filter-item-name">Heebo</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=IvyPresto" class="filters--item ">
                              <span class="js-filter-item-name">IvyPresto</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Josefin%20Sans" class="filters--item ">
                              <span class="js-filter-item-name">Josefin Sans</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Jost" class="filters--item ">
                              <span class="js-filter-item-name">Jost</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=MabryPro" class="filters--item ">
                              <span class="js-filter-item-name">MabryPro</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Messina" class="filters--item ">
                              <span class="js-filter-item-name">Messina</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Moranga" class="filters--item ">
                              <span class="js-filter-item-name">Moranga</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=NeueBit" class="filters--item ">
                              <span class="js-filter-item-name">NeueBit</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Nimbus" class="filters--item ">
                              <span class="js-filter-item-name">Nimbus</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Outfit" class="filters--item ">
                              <span class="js-filter-item-name">Outfit</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=PT" class="filters--item ">
                              <span class="js-filter-item-name">PT</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Adelle" class="filters--item ">
                              <span class="js-filter-item-name">Adelle</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Agrandir" class="filters--item ">
                              <span class="js-filter-item-name">Agrandir</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Alegreya" class="filters--item ">
                              <span class="js-filter-item-name">Alegreya</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Anton" class="filters--item ">
                              <span class="js-filter-item-name">Anton</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Arimo" class="filters--item ">
                              <span class="js-filter-item-name">Arimo</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Aventa" class="filters--item ">
                              <span class="js-filter-item-name">Aventa</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Bai%20Jamjuree" class="filters--item ">
                              <span class="js-filter-item-name">Bai Jamjuree</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Basier%20Circle" class="filters--item ">
                              <span class="js-filter-item-name">Basier Circle</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Beatrice" class="filters--item ">
                              <span class="js-filter-item-name">Beatrice</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Biotif" class="filters--item ">
                              <span class="js-filter-item-name">Biotif</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Bitter" class="filters--item ">
                              <span class="js-filter-item-name">Bitter</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Bon" class="filters--item ">
                              <span class="js-filter-item-name">Bon</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Brandon" class="filters--item ">
                              <span class="js-filter-item-name">Brandon</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Butler" class="filters--item ">
                              <span class="js-filter-item-name">Butler</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Cabin" class="filters--item ">
                              <span class="js-filter-item-name">Cabin</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Cardinal%20Fruit" class="filters--item ">
                              <span class="js-filter-item-name">Cardinal Fruit</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Caveat" class="filters--item ">
                              <span class="js-filter-item-name">Caveat</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Chivo" class="filters--item ">
                              <span class="js-filter-item-name">Chivo</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Cinzel" class="filters--item ">
                              <span class="js-filter-item-name">Cinzel</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a
                              href="/websites/?tag=portfolio&amp;typography=Copyright%20%28C%29%20H%26Co%20%7C%20typography.com"
                              class="filters--item "
                            >
                              <span class="js-filter-item-name">Copyright (C) H&amp;Co |
                                typography.com</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a
                              href="/websites/?tag=portfolio&amp;typography=Copyright%20Sharp%20Type%20Co.%20This%20font%20is%20licensed%20for%20web%20use%20only."
                              class="filters--item "
                            >
                              <span class="js-filter-item-name">Copyright Sharp Type Co. This
                                font is licensed for web use only.</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=ETmodules" class="filters--item ">
                              <span class="js-filter-item-name">ETmodules</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Euclid" class="filters--item ">
                              <span class="js-filter-item-name">Euclid</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Font" class="filters--item ">
                              <span class="js-filter-item-name">Font</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Fraunces" class="filters--item ">
                              <span class="js-filter-item-name">Fraunces</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Gatwick" class="filters--item ">
                              <span class="js-filter-item-name">Gatwick</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Gellix" class="filters--item ">
                              <span class="js-filter-item-name">Gellix</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Georgia" class="filters--item ">
                              <span class="js-filter-item-name">Georgia</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Halyard" class="filters--item ">
                              <span class="js-filter-item-name">Halyard</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Hatton" class="filters--item ">
                              <span class="js-filter-item-name">Hatton</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Karla" class="filters--item ">
                              <span class="js-filter-item-name">Karla</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Knockout" class="filters--item ">
                              <span class="js-filter-item-name">Knockout</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Larken" class="filters--item ">
                              <span class="js-filter-item-name">Larken</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Lausanne%20300" class="filters--item ">
                              <span class="js-filter-item-name">Lausanne 300</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Lexend" class="filters--item ">
                              <span class="js-filter-item-name">Lexend</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Mabry" class="filters--item ">
                              <span class="js-filter-item-name">Mabry</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Mabry%20Pro" class="filters--item ">
                              <span class="js-filter-item-name">Mabry Pro</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Menlo" class="filters--item ">
                              <span class="js-filter-item-name">Menlo</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Museo" class="filters--item ">
                              <span class="js-filter-item-name">Museo</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=NaN" class="filters--item ">
                              <span class="js-filter-item-name">NaN</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Neue%20World" class="filters--item ">
                              <span class="js-filter-item-name">Neue World</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=NewYork" class="filters--item ">
                              <span class="js-filter-item-name">NewYork</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Oakes" class="filters--item ">
                              <span class="js-filter-item-name">Oakes</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=ObjectSans" class="filters--item ">
                              <span class="js-filter-item-name">ObjectSans</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Objectsans" class="filters--item ">
                              <span class="js-filter-item-name">Objectsans</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Ortica" class="filters--item ">
                              <span class="js-filter-item-name">Ortica</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Plain" class="filters--item ">
                              <span class="js-filter-item-name">Plain</span>
                            </a>
                          </li>
                          <li class="js-filter-item">
                            <a href="/websites/?tag=portfolio&amp;typography=Prata" class="filters--item ">
                              <span class="js-filter-item-name">Prata</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div id="filter-winners-palette" class="filters--tab">
                    <ul class="filters--colors">
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23B42625" class="filters--item "
                          style="background-color:#B42625;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23DA4F48" class="filters--item "
                          style="background-color:#DA4F48;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23E88D88" class="filters--item "
                          style="background-color:#E88D88;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23C14E0B" class="filters--item "
                          style="background-color:#C14E0B;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23F57327" class="filters--item "
                          style="background-color:#F57327;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23F0CED1" class="filters--item "
                          style="background-color:#F0CED1;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23FABC0F" class="filters--item "
                          style="background-color:#FABC0F;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23FAD15F" class="filters--item "
                          style="background-color:#FAD15F;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23FBE9A7" class="filters--item "
                          style="background-color:#FBE9A7;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23819526" class="filters--item "
                          style="background-color:#819526;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23B3CF3C" class="filters--item "
                          style="background-color:#B3CF3C;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23CDDE7E" class="filters--item "
                          style="background-color:#CDDE7E;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%231981C8" class="filters--item "
                          style="background-color:#1981C8;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%2349ABE8" class="filters--item "
                          style="background-color:#49ABE8;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%238FCAF0" class="filters--item "
                          style="background-color:#8FCAF0;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%237B19C8" class="filters--item "
                          style="background-color:#7B19C8;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%239743D9" class="filters--item "
                          style="background-color:#9743D9;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23BE83ED" class="filters--item "
                          style="background-color:#BE83ED;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%239D33A1" class="filters--item "
                          style="background-color:#9D33A1;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23C559C4" class="filters--item "
                          style="background-color:#C559C4;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23DC94DE" class="filters--item "
                          style="background-color:#DC94DE;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23404040" class="filters--item "
                          style="background-color:#404040;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%237A7A7A" class="filters--item "
                          style="background-color:#7A7A7A;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23C4C4C4" class="filters--item "
                          style="background-color:#C4C4C4;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23E4E3E3" class="filters--item "
                          style="background-color:#E4E3E3;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23F3F2F2" class="filters--item "
                          style="background-color:#F3F2F2;"
                        />
                      </li>
                      <li>
                        <a
                          href="/websites/?tag=portfolio&amp;palette=%23FFFFFF" class="filters--item "
                          style="background-color:#FFFFFF;"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="menu-float--bottom">
            <div class="menu-float--layout menu-float--layout--primary">
              <div class="menu-float--content">
                <a href="/" class="menu-float--logo "><span class="color-gray-300">RYAN</span></a>
                <div class="menu-float--breadcrumb">
                  <span class="menu-float--title" style="font-weight: 100;">THE</span>
                  <span class="menu-float--subtitle bold" style="font-weight: bold;">DVLPR<span
                    style="color: var(--color-primary);font-weight: bold;"
                  >.</span></span>
                </div>
                <div class="menu-float--hamburger js-menufloat-hamburger">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>

            <!-- <div class="menu-float--layout menu-float--layout--secondary">
              <div class="menu-float--content">
                <strong class="menu-float--title-section">Fiddlters</strong>
                <ul class="menu-float--filters">
                  <ul>
                    <li>
                      <span class="menu-float--filter js-menufloat-filter has-filter" data-id="filter-winners-popular">
                        Experiments
                        <svg class="ico-svg menu-float--arrow" viewBox="0 0 20 20" width="12" />

                      </span>
                    </li>
                    <li>
                      <span class="menu-float--filter js-menufloat-filter" data-id="filter-winners-country">
                        Services
                        <svg class="ico-svg menu-float--arrow" viewBox="0 0 20 20" width="12" />

                      </span>
                    </li>
                    <li>
                      <span class="menu-float--filter js-menufloat-filter" data-id="filter-winners-typography">
                        About
                        <svg class="ico-svg menu-float--arrow" viewBox="0 0 20 20" width="12" />

                      </span>
                    </li>
                    <li>
                      <span class="menu-float--filter js-menufloat-filter" data-id="filter-winners-palette">
                        Contact
                        <svg class="ico-svg menu-float--arrow" viewBox="0 0 20 20" width="12" />

                      </span>
                    </li>
                  </ul>
                </ul>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-float {
  bottom: -300px;
  position: fixed;
  left: 0;
  width: 100%;
  font-size: 14px;
  opacity: .5;
  z-index: 11000;
}

.menu-float.is-visible {
  opacity: 1;
}

.menu-float--inner {
  position: relative;
  display: flex;
  justify-content: center;
  transition: all .5s var(--ease-squish-5);
}

.menu-float--top {
  max-width: 707px;
  max-height: 0;
  overflow: hidden;
  transition: all .4s
}

.menu-float--bottom {
  display: flex;
  justify-content: center
}

.menu-float--bottom:before {
  content: "";
  height: 60px;
  transition: all .3s var(--ease-squish-5);
}

.menu-float--wrapper {
  box-shadow: 0 0 20px 0 rgba(255, 255, 255, 5);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: auto !important;
  max-width: -webkit-fit-content;
  max-width: -moz-fit-content;
  max-width: fit-content;
  padding: 6px;
  border-radius: var(--radius-3);
  background: var(--gray-9) !important;
  pointer-events: all !important;
  transition: all .5s var(--ease-squish-5);
}

.menu-float--inner:active {
  transform: scale(.8);
}
.menu-float--wrapper.is-open-main .menu-float--bottom {
  position: relative
}

.menu-float--wrapper.is-open-main .menu-float--layout--primary .menu-float--content {
  width: 100%
}

.menu-float--wrapper.is-open-main .menu-float--layout--primary {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%
}

.menu-float--wrapper.is-open-main .menu-float--layout--secondary,
.menu-float--wrapper.is-open-main .menu-float--layout--tertiary {
  opacity: 0;
  visibility: hidden
}

.menu-float--wrapper.is-open {
  min-width: 720px !important;
  max-width: 1200px
}

.menu-float--wrapper.is-open .menu-float--top {
  max-height: 500px
}

.menu-float--wrapper.is-open .menu-float--bottom:before {
  flex: 0;
  width: 100%
}

.menu-float--wrapper.is-open .menu-float--menu-content {
  max-width: 1200px
}

.menu-float--wrapper.is-open .menu-float--title:after {
  max-width: 200px;
  opacity: 1
}

.menu-float--wrapper.is-open .menu-float--subtitle {
  max-width: 200px;
  opacity: 1
}

.menu-float--wrapper.is-open .menu-float--hamburger {
  margin-left: auto
}

.menu-float--wrapper.is-open .menu-float--hamburger div:nth-child(1) {
  top: 0;
  transform: rotate(45deg)
}

.menu-float--wrapper.is-open .menu-float--hamburger div:nth-child(2) {
  opacity: 0
}

.menu-float--wrapper.is-open .menu-float--hamburger div:nth-child(3) {
  top: 0;
  transform: rotate(-45deg)
}

.menu-float--right {
  position: absolute;
  right: 0;
  bottom: 0
}

.menu-float--right .menu-float--wrapper {
  overflow: visible !important;

}

.menu-float--logo {
  display: flex;
  color: #fff;
  font-weight: bold
}

.menu-float--breadcrumb {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  height: 48px
}

.menu-float--title {
  margin-left: -2px;
  color: var(--menu-color-1)
}

.menu-float--title+.menu-float--subtitle:before {
  content: ".";
  margin-right: 2px;
  color: var(--menu-color-1);
  font-weight: bold
}

.menu-float--subtitle {
  color: #a7a7a7;
  transition: all .3s
}

.menu-float--layout--primary .menu-float--content {
  display: flex;
  padding: 0 20px;
  background-color: var(--bg-secondary);
  color: #fff
}

.menu-float--layout--secondary {
  flex: 1;
  margin-left: 6px
}

.menu-float--layout--secondary .menu-float--content {
  position: relative;
  width: 100%;
  background: var(--gray-7) !important;
  color: #a7a7a7
}

.menu-float--layout--secondary .menu-float--item {
  justify-content: center;
  width: 100%;
  border: 1px solid #4e4e4e;
  color: #a7a7a7;
  white-space: nowrap
}

.menu-float--layout--secondary .menu-float--item.is-active {
  background: #d3d3d3;
  color: var(--color-primary)
}

.menu-float--layout--secondary .menu-float--item.is-active:hover {
  background: #e9e9e9
}

.menu-float--layout--secondary .menu-float--item:hover {
  background: #4e4e4e
}

.menu-float--layout--tertiary {
  margin-left: 6px
}

.menu-float--layout--tertiary .menu-float--content {
  padding: 0
}

.menu-float--layout--tertiary .button {
  width: 100%;
  font-size: 14px;
  transition: all .3s
}

.menu-float--layout--tertiary .button:not(.is-custom) {
  background: var(--menu-color-1);
  color: var(--color-primary)
}

.menu-float--layout--tertiary .button:hover {
  opacity: .8
}

.menu-float--hamburger {
  position: relative;
  width: 20px;
  height: 30px;
  cursor: pointer;
  pointer-events: auto;
  transition: all .3s
}

.menu-float--hamburger div {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 10px;
  height: 1px;
  background-color: #fff;
  transform: translateZ(0);
  transition: all .3s
}

.menu-float--hamburger div:nth-child(1) {
  top: -8px
}

.menu-float--hamburger div:nth-child(3) {
  top: 8px
}

.menu-float--menu {
  display: none;
  width: 100%;
  display: none;
  margin-bottom: 6px;
  padding: 30px;
  background: #2c2c2c;
  color: #fff;
  border-radius: var(--rounded-normal);
  z-index: -1;
  transition: all .4s
}

.menu-float--menu--main {
  display: flex;
  font-size: 15px;
  padding-top: 4px;
  padding-left: 1px
}

.menu-float--menu.is-active {
  display: block
}

.menu-float--menu-content {
  max-width: 0;
  opacity: 0;
  transition: all .4s, max-width 0s;
  overflow: hidden
}

ul {
  background-color: var(--gray-8);
}

li {
  transform: scale(1)
}

.menu-float--menu-content.is-show {
  opacity: 1
}

.menu-float--menu-col {
  position: relative;
  flex: 1;
  background-image: linear-gradient(to bottom, #7a7a7a 0 10%, rgba(255, 255, 255, 0) 10%);
  background-position: left top;
  background-repeat: repeat-y;
  background-size: 1px 8px
}

.menu-float--menu-section {
  position: relative;
  margin-top: -4px;
  margin-bottom: 20px;
  margin-left: 16px;
  font-size: 12px;
  color: #a7a7a7;
  line-height: normal
}

.menu-float--menu-section:before {
  content: "";
  position: absolute;
  top: 3px;
  left: -17px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--menu-color-2, #fff)
}

.menu-float--menu-section+ul {
  margin-bottom: 28px
}

.menu-float--menu-nav {
  line-height: 120%
}

.menu-float--menu-nav li {
  margin-bottom: 16px
}

.menu-float--menu-nav li.is-active {
  font-weight: bold
}

.menu-float--menu-nav li.is-active a {
  color: var(--menu-color-1, --color-white);
  border-color: var(--menu-color-1, --color-white)
}

.menu-float--menu-nav a {
  display: block;
  padding: 8px 0 8px 16px;
  border-left: 1px solid transparent;
  transition: all .3s
}

.menu-float--menu-nav a:hover {
  color: var(--menu-color-1, --color-white);
  border-color: var(--menu-color-1, --color-white)
}

.menu-float--menu a {
  color: #fff
}

.menu-float--title-section {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin: 0 12px 0 6px;
  line-height: normal
}

.menu-float--content {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 60px;
  padding: 0 6px;
  text-align: center;
  border-radius: var(--rounded-normal);
  overflow: hidden
}

.menu-float--progress {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%
}

.menu-float--bar {
  background-color: rgba(78, 78, 78, .5);
  width: 0;
  height: 100%
}

.menu-float--nav {
  position: relative;
  display: flex;
  margin-left: -6px
}

.menu-float--nav li {
  display: flex
}

.menu-float--item {
  display: inline-flex;
  align-items: center;
  height: 48px;
  margin-left: 6px;
  padding: 0 12px;
  border-radius: var(--rounded-normal);
  color: var(--color-primary);
  font-weight: 400;
  cursor: pointer;
  overflow: hidden;
  transition: max-width .3s, padding .3s, margin .3s, color .3s, background .3s, border-radius .3s, opacity .3s
}

.menu-float--item:hover {
  opacity: .8
}

.menu-float--filters {
  position: relative;
  display: flex;
  height: 60px;
  margin-left: -6px;
  margin-right: -6px
}

.menu-float--filters li {
  border-left: 1px solid rgba(var(--color-primary-rgb), 0.1)
}

.menu-float--filter {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none
}

.menu-float--filter.has-filter:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--menu-color-2)
}

.menu-float--filter.is-active {
  background: #222
}

.menu-float--filter.is-active svg {
  transform: scaleY(-1)
}

.menu-float--arrow {
  fill: #a7a7a7;
  margin-left: 12px
}

.menu-float .bt-nav {
  position: absolute;
  bottom: 0;
  pointer-events: auto;
  transition: all .3s cubic-bezier(0.5, -0.9, 0.1, 1.5);
}

.menu-float .bt-nav--left {
  left: 0;
  transform: translateX(-100%);
}

.menu-float .bt-nav--right {
  right: 0px;
  transform: translateX(100%);
}

.menu-float:hover .bt-nav--left,
.menu-float:hover .bt-nav--right {
  transform: translateX(0)
}

.menu .menu-float .button--suggestions {
  --button-bg: var(--bg-secondary);
  --button-color: #fff
}

.menu-float .button--suggestions:hover {
  background-color: #4e4e4e
}

.menu-float .button--suggestions img {
  margin: 0 20px 0 8px;
  border-radius: 50%
}

.menu-float .button--suggestions .budget-circle {
  flex-shrink: 0;
  margin: 0 8px 0 20px;
  background: #4e4e4e
}

.style-1 {
  --menu-color-1: var(--color-inspire);
  --menu-color-2: var(--color-inspire-2);
  --menu-color-3: var(--color-inspire-3)
}

.style-2 {
  --menu-color-1: var(--color-learn);
  --menu-color-2: var(--color-learn-2);
  --menu-color-3: var(--color-learn-3)
}

.style-3 {
  --menu-color-1: var(--color-connect);
  --menu-color-2: var(--color-connect-2);
  --menu-color-3: var(--color-connect-3)
}

.style-4 {
  --menu-color-1: var(--color-read);
  --menu-color-2: var(--color-read-2);
  --menu-color-3: var(--color-read-3)
}

.style-5 {
  --menu-color-1: var(--color-awards);
  --menu-color-2: var(--color-awards-2);
  --menu-color-3: var(--color-awards-3)
}

.style-6 {
  --menu-color-1: var(--color-jobs);
  --menu-color-2: var(--color-jobs-2);
  --menu-color-3: var(--color-jobs-3)
}

.bt-nav {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border-radius: var(--rounded-normal);
  cursor: pointer;
  transition: all .3s cubic-bezier(0.5, -0.9, 0.1, 1.5);
}

.bt-nav.is-hidden {
  opacity: 0
}

.is-intersecting .c-box-float-more .box-float-more {
  opacity: 1;
  top: 0;
  transform: translateY(0);
}

.c-box-float-more {
  position: fixed;
  bottom: 30px;
  left: 0;
  width: 100%;
  z-index: 9;

}

.c-box-float-more .inner {
  position: relative;
  display: flex;
  justify-content: flex-end
}

.c-box-float-more .box-float-more {
  pointer-events: all;
  opacity: 0;
  transform: translateY(50px)
}

.box-float-more {
  position: relative;
  display: inline-flex;
  height: 60px;
  margin: 6px 0;
  padding: 6px;
  background: var(--bg-secondary);
  border-radius: var(--rounded-small);
  color: #fff;
  line-height: 120%;
  pointer-events: all;
  overflow: hidden;
  transition: all .3s ease-in-out
}

.box-float-more:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--menu-color-2)
}

.box-float-more--info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 80px;
  padding: 0 12px
}

.box-float-more--info span {
  color: #7a7a7a
}

.box-float-more--photo {
  border-radius: 4px;
  -o-object-fit: cover;
  object-fit: cover
}

.filters {
  display: flex;
  flex-direction: column;
  border-radius: var(--rounded-normal);
  transition: all .3s;
  z-index: -1;
  pointer-events: all
}

.filters--tab {
  display: none
}

.filters--tab.is-active {
  display: block
}

.filters--search {
  display: flex;
  height: 40px;
  margin-bottom: 20px;
  background: #383838;
  border-radius: var(--rounded-small)
}

.filters--search input {
  flex: 1;
  padding: 0 16px;
  background: transparent;
  font-size: var(--text-size-primary);
  color: var(--color-white)
}

.filters--search button {
  width: 40px;
  background: transparent;
  border: none
}

.filters--search .ico-svg {
  fill: var(--color-white)
}

.filters--label {
  margin-bottom: 1.5em;
  text-transform: uppercase;
  color: #7a7a7a;
  font-weight: 400;
  font-size: var(--text-size-small);
  border-bottom: 1px solid #4e4e4e;
  clear: both
}

.filters--content {
  flex: 1;
  max-height: 310px;
  color: var(--color-white);
  overflow-y: auto;
  overflow-x: hidden
}

.filters--content::-webkit-scrollbar {
  width: 2px
}

.filters--content::-webkit-scrollbar-track {
  background: #383838
}

.filters--content::-webkit-scrollbar-thumb {
  background-color: var(--color-white)
}

.filters--list li {
  float: left;
  width: 33.333%
}

.filters--list--small li {
  width: 50%
}

.filters--list+.filters--title {
  padding-top: 2em
}

.filters li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}

.filters--item {
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 8px;
  color: var(--color-white);
  border-radius: 26px;
  cursor: pointer;
  transition: all .3s
}

.filters--item.is-active {
  color: var(--menu-color-3);
  background: #383838
}

.filters--item.is-active .ico-svg {
  margin-left: 6px
}

.filters--item:hover {
  background: #383838
}

.filters--colors {
  display: grid;
  grid-template-columns: repeat(9, 1fr)
}

.filters--colors .filters--item {
  position: relative;
  display: flex;
  width: 100%;
  height: 36px;
  padding: 0;
  border-radius: 0;
  outline: 4px solid transparent;
  transition: z-index 0s outline .6s
}

.filters--colors .filters--item.is-active,
.filters--colors .filters--item:hover {
  outline-color: var(--color-white);
  z-index: 1
}

.cart-count {
  position: relative;
  display: block;
  margin: auto;
  display: flex
}

.cart-count span {
  position: absolute;
  top: -12px;
  right: -12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  background: #fff;
  color: var(--color-primary);
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  line-height: normal
}

@media(max-width: 576px) {
  .menu-float.is-visible {
    bottom: 8px
  }

  .menu-float--wrapper {
    min-width: auto !important
  }

  .menu-float--wrapper.is-open-main .menu-float--layout--primary {
    position: static
  }

  .menu-float--wrapper.is-open {
    min-width: 100% !important
  }

  .menu-float--wrapper.is-open .menu-float--top {
    max-height: var(--mft-height, 100vh)
  }

  .menu-float--wrapper.is-open .menu-float--layout--tertiary {
    display: none
  }

  .menu-float--top {
    overflow-y: auto
  }

  .menu-float--layout--primary {
    flex: 1
  }

  .menu-float--layout--primary .menu-float--content {
    display: flex
  }

  .menu-float--layout--secondary {
    display: none
  }

  .menu-float--menu {
    padding: 20px
  }

  .menu-float--menu--main {
    flex-direction: column
  }

  .menu-float--menu-nav li {
    margin-bottom: 0
  }

  .menu-float--menu-col:last-child .menu-float--menu-row:last-child {
    margin-bottom: 0
  }

  .menu-float--menu-row {
    margin-bottom: 20px
  }

  .menu-float--menu-section {
    margin-bottom: 12px
  }

  .menu-float--menu-section+ul {
    margin-bottom: 12px
  }

  .menu-float .inner {
    padding: 0 8px
  }

  .menu-float .bt-nav {
    display: none
  }

  .menu-float .button {
    --button-height: 60px
  }
}
</style>
