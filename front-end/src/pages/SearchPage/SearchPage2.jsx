import React from 'react';
import moment from 'moment';

import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';

import { ErrorBoundary, Facet, SearchProvider, SearchBox, Results, PagingInfo, ResultsPerPage, Paging, Sorting, WithSearch } from '@elastic/react-search-ui';
import { Layout, SingleSelectFacet } from '@elastic/react-search-ui-views';
import '@elastic/react-search-ui-views/lib/styles/styles.css';

const SORT_OPTIONS = [
  {
    name: 'Relevance',
    value: '',
    direction: '',
  },
  {
    name: 'Title',
    value: 'title',
    direction: 'asc',
  },
];

const connector = new AppSearchAPIConnector({
  searchKey: 'search-371auk61r2bwqtdzocdgutmg',
  engineName: 'search-ui-examples',
  hostIdentifier: 'host-2376rb',
  endpointBase: '',
});

const config = {
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    result_fields: {
      title: {
        snippet: {
          size: 100,
          fallback: true,
        },
      },
      nps_link: {
        raw: {},
      },
      description: {
        snippet: {
          size: 100,
          fallback: true,
        },
      },
    },
    disjunctiveFacets: ['acres', 'states', 'date_established'],
    facets: {
      world_heritage_site: { type: 'value' },
      states: { type: 'value', size: 10 },
      acres: {
        type: 'range',
        ranges: [
          { from: -1, name: 'Any' },
          { from: 0, to: 1000, name: 'Small' },
          { from: 1001, to: 100000, name: 'Medium' },
          { from: 100001, name: 'Large' },
        ],
      },

      date_established: {
        type: 'range',

        ranges: [
          {
            from: moment().subtract(50, 'years').toISOString(),
            name: 'Within the last 50 years',
          },
          {
            from: moment().subtract(100, 'years').toISOString(),
            to: moment().subtract(50, 'years').toISOString(),
            name: '50 - 100 years ago',
          },
          {
            to: moment().subtract(100, 'years').toISOString(),
            name: 'More than 100 years ago',
          },
        ],
      },
    },
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      result_fields: {
        title: {
          snippet: {
            size: 100,
            fallback: true,
          },
        },
        nps_link: {
          raw: {},
        },
      },
    },
    suggestions: {
      types: {
        documents: {
          fields: ['title', 'description'],
        },
      },
      size: 4,
    },
  },
  apiConnector: connector,
};

const SearchPage = () => {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className="search-app">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      autocompleteMinimumCharacters={3}
                      //searchAsYouType={true}
                      autocompleteResults={{
                        linkTarget: '_blank',
                        sectionTitle: 'Results',
                        titleField: 'title',
                        urlField: 'nps_link',
                        shouldTrackClickThrough: true,
                        clickThroughTags: ['test'],
                      }}
                      autocompleteSuggestions={true}
                      debounceLength={0}
                    />
                  }
                  sideContent={
                    <div>
                      {wasSearched && <Sorting label={'Sort by'} sortOptions={SORT_OPTIONS} />}
                      <Facet field="states" label="States" filterType="any" isFilterable={true} />
                      <Facet field="date_established" label="Date Established" filterType="any" />
                      <Facet field="acres" label="Acres" view={SingleSelectFacet} />
                    </div>
                  }
                  bodyContent={<Results titleField="title" urlField="nps_link" shouldTrackClickThrough={true} />}
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
};

export default SearchPage;
