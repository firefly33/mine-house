import { collection, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from "swiper"
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide} from 'swiper/react'
import { db } from "../firebase.config"
import Spinner from "./Spinner"
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider({ limitElements }) {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(limitElements))
  
      const querySnap = await getDocs(q)
  
      let listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
    }
    fetchListings()
  }, [limitElements])
  
  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }
  
  return listings && (
    <>
      <p className="exploreHeading">Recommended</p>
      <Swiper slidesPerView={1} pagination={{clickable: true}}>
        { listings.map(({data, id}) => (
          <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
            <div style={{ background: `url(${data.imgUrls[0]}) no-repeat`, backgroundSize: 'cover' }} className="swiperSlideDiv">
              <p className="swiperSlideText">{ data.name }</p>
              <p className="swiperSlidePrice">
                ${data.discountedPrice ?? data.regularPrice }
                {' '}{ data.type === 'rent' && '/ month' }
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Slider