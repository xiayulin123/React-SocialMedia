import { Models } from 'appwrite';
import Loader from './loader';
import GridPostList from './GridPostList';

type SearchResultsProps = {
    isSearchPending: boolean;
    searchedPosts: Models.Document[]
}

const SearchResults = ({isSearchPending, searchedPosts} : SearchResultsProps) => {
  if(isSearchPending){
    return (
        <Loader />
      )
  }
  if(searchedPosts && searchedPosts.documents.length > 0) return (
  <GridPostList posts={searchedPosts.documents} /> 
  )
    return (
        <p className='w-full text-light-4 mt-10 text-center'>No Results found</p>
    )
}

export default SearchResults