import { useContext, useState } from "react"
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import StopContext from "../context/stopContext";
import VehiclePositionContext from "../context/vehiclePositionContext";
import { useNavigate } from "react-router-dom";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      width: '100%',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
          width: '20ch',
          '&:focus': {
            width: '30ch',
          },
        },
      },
    }));

  interface SearchOption {
    title: string,
    url: string
  }

  const Input = (props: { options: SearchOption[], onOptionSelected: (index: number) => void }) => {
    const [open, setOpen] = useState(false)
    const [transitionActive, setTransitionActive] = useState(false)

    const optionTitles = props.options.map(option => option.title)
    
    const onChange = (_: any, value: string) => {
      props.onOptionSelected(optionTitles.indexOf(value))
    }

    return <Autocomplete
        disableClearable
        options={optionTitles}
        onChange={onChange}
        blurOnSelect={true}
        clearOnBlur={true}
        open={open && !transitionActive}
        onOpen={() => {
          setTransitionActive(true)
          setOpen(true)
        }}
        onClose={() => setOpen(false)}
        onTransitionEndCapture={() => {
          setTransitionActive(false)
        }}
        renderInput={(params) => {
            const {inputProps, InputProps, InputLabelProps, ...rest} = params

            return <StyledInputBase
                {...rest}
                ref={params.InputProps.ref}
                placeholder="Search…"
                inputProps={{
                  ...inputProps,
                  type: 'search',
                  "aria-label": 'search'
                }}
            />
        }}/>
  }

  const AppBarSearch = () => {
    const stops = useContext(StopContext)
    const vehicles = useContext(VehiclePositionContext)

    const navigate = useNavigate()
    
    const options = [
      ...stops.map(stop => {
        return {
          title: stop.name ?? "",
          url: `/stops/${stop.stopId}`
        }
      }),
      ...vehicles.map(vehicle => {
        return {
          title: vehicle.vehicleLabel ?? "",
          url: `/trips/${vehicle.trip.tripId}/${vehicle.trip.date}`
        }
      })
    ]

    return <Search>
      <SearchIconWrapper>
          <SearchIcon />
      </SearchIconWrapper>
      <Input
        options={options}
        onOptionSelected={(index) => {
          navigate(options[index].url)
        }}/>
    </Search>
  }

  export default AppBarSearch