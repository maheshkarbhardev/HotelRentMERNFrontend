import { useParams } from "react-router-dom";
import "../styles/List.scss"
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
// import Footer from "../components/Footer"

const SearchPage = () => {
  const [loading, setLoading] = useState(true)
  const { search } = useParams()
  const listings = useSelector((state) => state.listings)

  const dispatch = useDispatch()

  const getSearchListings = async () => {
    try {
      const response = await fetch(`https://hotelrentmernbackend.onrender.com/properties/search/${search}`, {
        method: "GET"
      })

      const data = await response.json()
      dispatch(setListings({ listings: data }))
      setLoading(false)
    } catch (err) {
      console.log("Fetch Search List failed!", err.message)
      setLoading(false) // Ensure loading is set to false even if the fetch fails
    }
  }

  useEffect(() => {
    getSearchListings()
  }, [search])
  
  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>
      <div className="list">
        {Array.isArray(listings) && listings.length > 0 ? (
          listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )
        ) : (
          <p>No listings found.</p>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default SearchPage
