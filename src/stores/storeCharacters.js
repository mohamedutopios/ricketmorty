/* import { defineStore } from 'pinia'
import { getCharacters } from 'rickmortyapi'
import filterCategories from '@/mockdata/filterCategories.json'



export const useStoreCharacters = defineStore('storeCharacters', {
  state: () => {
    return {
      requestFilters: {
        page: 1,
      },
      filterCategories: [],
      charactersLoading: true,
      charactersCount: 0,
      characterItems: [],
      lastPage: 1
    }
  },
  actions: {
    init(){
      this.filterCategories = filterCategories
      this.getFiltersFromSessionStorage()
      this.getCharacters()
    },

    getFiltersFromSessionStorage() {
      if(!sessionStorage.getItem('page')) {
        sessionStorage.setItem('page', this.requestFilters.page)
      } else {
        const storedFilters = {}
        storedFilters.page = Number(sessionStorage.getItem('page'))
        filterCategories.forEach(el => {
          if(sessionStorage.getItem(el.name)) {
          storedFilters[el.name] = sessionStorage.getItem(el.name)
          }
        })
        this.requestFilters = storedFilters
      }
    },

    async getCharacters() {
      const response = await getCharacters(this.requestFilters)
      sessionStorage.setItem('page', this.requestFilters.page)
      if(response.status === 200) {
        const data = response.data
        this.charactersCount = data.info.count
        this.characterItems = data.results
        this.lastPage = data.info.pages
        this.charactersLoading = false
      } else {
        this.characterItems = []
        this.charactersLoading = false
        this.charactersCount = 0
        this.lastPage = 1
      }
    },

    async setStoreFilters(filterName, subFilter) {
      if(subFilter !== 'all' && subFilter !== '') {
        this.requestFilters.page = 1
        this.requestFilters[filterName] = subFilter
        sessionStorage.setItem(filterName, subFilter)
        this.getCharacters()
      } else {
        delete this.requestFilters[filterName]
        sessionStorage.removeItem(filterName, subFilter)
        this.getCharacters()
      }
    },

    resetStoreFilters() {
      this.requestFilters = { page: 1 }
      sessionStorage.clear()
      this.getCharacters()
    },

    goToPage(page) {
      if(page > 0 && page <= this.lastPage)
        this.requestFilters.page = page
        this.getCharacters()
    },

    movePage(page) {
      if(this.requestFilters.page + page <= this.lastPage && this.requestFilters.page + page >= 1)
        this.requestFilters.page += page
        this.getCharacters()
    }
  }
}) */
/* import { defineStore } from 'pinia';
import { getCharacters } from 'rickmortyapi';
import filterCategories from '@/mockdata/filterCategories.json';
import { ref, watch } from 'vue';

export const useStoreCharacters = defineStore('storeCharacters', () => {
  const requestFilters = ref({
    page: 1,
  });
  const filterCategoriesData = ref(filterCategories);
  const charactersLoading = ref(true);
  const charactersCount = ref(0);
  const characterItems = ref([]);
  const lastPage = ref(1);

  const getFiltersFromSessionStorage = () => {
    if (!sessionStorage.getItem('page')) {
      sessionStorage.setItem('page', requestFilters.value.page);
    } else {
      const storedFilters = {};
      storedFilters.page = Number(sessionStorage.getItem('page'));
      filterCategoriesData.value.forEach(el => {
        if (sessionStorage.getItem(el.name)) {
          storedFilters[el.name] = sessionStorage.getItem(el.name);
        }
      });
      requestFilters.value = storedFilters;
    }
  };

  const fetchCharacters = async () => {
    const response = await getCharacters(requestFilters.value);
    sessionStorage.setItem('page', requestFilters.value.page);
    if (response.status === 200) {
      const data = response.data;
      charactersCount.value = data.info.count;
      characterItems.value = data.results;
      lastPage.value = data.info.pages;
      charactersLoading.value = false;
    } else {
      characterItems.value = [];
      charactersLoading.value = false;
      charactersCount.value = 0;
      lastPage.value = 1;
    }
  };

  // Initialize store
  filterCategoriesData.value = filterCategories;
  getFiltersFromSessionStorage();
  fetchCharacters();

  // Watchers for reactive changes
  watch(requestFilters, fetchCharacters);

  return {
    requestFilters,
    filterCategoriesData,
    charactersLoading,
    charactersCount,
    characterItems,
    lastPage,
    getFiltersFromSessionStorage,
    fetchCharacters,
  };
});
 */

/* import { defineStore } from 'pinia';
import { getCharacters } from 'rickmortyapi';
import filterCategories from '@/mockdata/filterCategories.json';
import { ref } from 'vue';

export const useStoreCharacters = defineStore('storeCharacters', () => {
  const requestFilters = ref({ page: 1 });
  const filterCategoriesData = ref(filterCategories);
  const charactersLoading = ref(true);
  const charactersCount = ref(0);
  const characterItems = ref([]);
  const lastPage = ref(1);

  const fetchCharacters = async () => {
    charactersLoading.value = true;
    const response = await getCharacters(requestFilters.value);
    if (response.status === 200) {
      const data = response.data;
      charactersCount.value = data.info.count;
      characterItems.value = data.results;
      lastPage.value = data.info.pages;
    } else {
      characterItems.value = [];
      charactersCount.value = 0;
      lastPage.value = 1;
    }
    charactersLoading.value = false;
  };

  const resetStoreFilters = () => {
    requestFilters.value = { page: 1 };
    sessionStorage.clear();
    fetchCharacters();
  };

  const goToPage = (page) => {
    if (page > 0 && page <= lastPage.value) {
      requestFilters.value.page = page;
      fetchCharacters();
    }
  };

  const movePage = (page) => {
    const newPage = requestFilters.value.page + page;
    if (newPage <= lastPage.value && newPage >= 1) {
      requestFilters.value.page = newPage;
      fetchCharacters();
    }
  };

  // Initialize store by fetching characters
  fetchCharacters();

  return {
    requestFilters,
    filterCategoriesData,
    charactersLoading,
    charactersCount,
    characterItems,
    lastPage,
    resetStoreFilters,
    goToPage,
    movePage,
  };
}); */
/* import { defineStore } from 'pinia';
import filterCategories from '@/mockdata/filterCategories.json';
import { ref } from 'vue';

export const useStoreCharacters = defineStore('storeCharacters', () => {
  const requestFilters = ref({ page: 1 });
  const filterCategoriesData = ref(filterCategories);
  const charactersLoading = ref(true);
  const charactersCount = ref(0);
  const characterItems = ref([]);
  const lastPage = ref(1);

  const fetchCharacters = async (url)  => {
    charactersLoading.value = true;

    // Replace this URL with the actual Rick and Morty API endpoint you wish to hit
    const url = `https://rickandmortyapi.com/api/character/?page=${requestFilters.value.page}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        charactersCount.value = data.info.count;
        characterItems.value = data.results;
        lastPage.value = data.info.pages;
      } else {
        throw new Error('Failed to fetch characters');
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
      characterItems.value = [];
      charactersCount.value = 0;
      lastPage.value = 1;
    }
    charactersLoading.value = false;
  };



  const setStoreFilters = async (filterName, subFilter) => {
    // Définition ou suppression du filtre
    if (subFilter !== 'all' && subFilter !== '') {
      requestFilters.value.page = 1;
      requestFilters.value[filterName] = subFilter;
      sessionStorage.setItem(filterName, subFilter);
    } else {
      delete requestFilters.value[filterName];
      sessionStorage.removeItem(filterName);
    }
  
    // Construction de l'URL pour l'API avec les filtres
    let query = `?page=${requestFilters.value.page}`;
    Object.keys(requestFilters.value).forEach((key) => {
      if (key !== 'page' && requestFilters.value[key]) {
        query += `&${key}=${encodeURIComponent(requestFilters.value[key])}`;
      }
    });
  
    const url = `https://rickandmortyapi.com/api/character/${query}`;
  
    await fetchCharacters(url); // Mettez à jour fetchCharacters pour accepter l'URL comme paramètre
  };
  

  const resetStoreFilters = () => {
    requestFilters.value = { page: 1 };
    sessionStorage.clear();
    fetchCharacters();
  };

  const goToPage = (page) => {
    if (page > 0 && page <= lastPage.value) {
      requestFilters.value.page = page;
      fetchCharacters();
    }
  };

  const movePage = (page) => {
    const newPage = requestFilters.value.page + page;
    if (newPage <= lastPage.value && newPage >= 1) {
      requestFilters.value.page = newPage;
      fetchCharacters();
    }
  };

  // Initialize store by fetching characters
  fetchCharacters();

  return {
    requestFilters,
    filterCategoriesData,
    charactersLoading,
    charactersCount,
    characterItems,
    lastPage,
    resetStoreFilters,
    setStoreFilters,
    goToPage,
    movePage,
  };
});
 */

import { defineStore } from 'pinia';
import filterCategories from '@/mockdata/filterCategories.json';
import { ref } from 'vue';

export const useStoreCharacters = defineStore('storeCharacters', () => {
  
  const requestFilters = ref({ page: 1 });
  const filterCategoriesData = ref(filterCategories);
  const charactersLoading = ref(true);
  const charactersCount = ref(0);
  const characterItems = ref([]);
  const lastPage = ref(1);

  const buildURL = () => {
    let query = `?page=${requestFilters.value.page}`;
    Object.keys(requestFilters.value).forEach((key) => {
      if (key !== 'page' && requestFilters.value[key]) {
        query += `&${key}=${encodeURIComponent(requestFilters.value[key])}`;
      }
    });
    return `https://rickandmortyapi.com/api/character/${query}`;
  };

  const fetchCharacters = async (url) => {
    charactersLoading.value = true;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        charactersCount.value = data.info.count;
        characterItems.value = data.results;
        lastPage.value = data.info.pages;
      } else {
        throw new Error('Failed to fetch characters');
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
      characterItems.value = [];
      charactersCount.value = 0;
      lastPage.value = 1;
    }
    charactersLoading.value = false;
  };

  const setStoreFilters = async (filterName, subFilter) => {
    if (subFilter !== 'all' && subFilter !== '') {
      requestFilters.value.page = 1;
      requestFilters.value[filterName] = subFilter;
      sessionStorage.setItem(filterName, subFilter);
    } else {
      delete requestFilters.value[filterName];
      sessionStorage.removeItem(filterName);
    }
    await fetchCharacters(buildURL());
  };

  const resetStoreFilters = () => {
    requestFilters.value = { page: 1 };
    sessionStorage.clear();
    fetchCharacters(buildURL());
  };

  const goToPage = (page) => {
    if (page > 0 && page <= lastPage.value) {
      requestFilters.value.page = page;
      fetchCharacters(buildURL());
    }
  };

  const movePage = (page) => {
    const newPage = requestFilters.value.page + page;
    if (newPage <= lastPage.value && newPage >= 1) {
      requestFilters.value.page = newPage;
      fetchCharacters(buildURL());
    }
  };

  // Initialize store by fetching characters with base URL
  fetchCharacters(buildURL());

  return {
    requestFilters,
    filterCategoriesData,
    charactersLoading,
    charactersCount,
    characterItems,
    lastPage,
    resetStoreFilters,
    setStoreFilters,
    goToPage,
    movePage,
  };
});
