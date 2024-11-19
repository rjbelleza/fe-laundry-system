import React from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import HomeIcon from '@mui/icons-material/Home';
import './fonts/fonts.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SellIcon from '@mui/icons-material/Sell';
import GroupsIcon from '@mui/icons-material/Groups';
import RuleIcon from '@mui/icons-material/Rule';

const AboutUs = () => {
    return (
        <ThemeProvider theme={theme}> 
            <CssBaseline />
            <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    height: '30em',
                    backgroundImage: 'url(images/store.jpeg)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }} component="header">

                    <Box sx={{
                            width: '100%',
                            height: '30em',
                            backgroundColor: 'rgba(217, 22, 86, 0.6)',
                            padding: '2em',
                        }}>

                            <HomeIcon 
                                color="success" 
                                sx={{
                                    height: '2em',
                                    width: '2em',
                                    '&:hover': {
                                    color: 'rgba(255, 235, 85, 0.7)',
                                        },
                                    cursor: 'pointer'
                                }}/>

                                    <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '80%', 
                                            width: '100%',
                                        }}>

                                            <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    height: '8em',
                                                    width: '30em',
                                                    border: '5px solid #FFEB55'
                                                }}>

                                                    <Typography 
                                                        color="success" 
                                                        sx={{
                                                            fontFamily: 'Poppins-ExtraBold',
                                                            fontSize: '6em',
                                                            marginLeft: '10px',
                                                        }}>
                                                    About</Typography>

                                                    <Typography 
                                                        color="primary" 
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontFamily: 'Poppins-ExtraBold',
                                                            fontSize: '6em',
                                                            backgroundColor: '#FFEB55',
                                                            height: '100%',
                                                            width: '100%',
                                                            marginLeft: '10px',
                                                        }}>
                                                    Us</Typography>

                                            </Box>
                                    </Box>
                    </Box>

                    {/* Main Content*/}
                    <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                            '@media (max-width: 700px)': 
                                { flexDirection: 'column',},
                        }}>

                        {/* Location Section*/}
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                                height: '350px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                                <LocationOnIcon sx={{
                                                    width: '50px',
                                                    height: '50px',
                                                }} color="primary" />

                                <Typography
                                    color="info"
                                    sx={{
                                        fontFamily: 'Poppins-SemiBold',
                                        textAlign: 'center',
                                        fontSize: '35px',
                                        marginBottom: '10px',
                                }}>
                                    Strategically <br/> Positioned
                                </Typography>

                                <Box sx={{
                                        width: '100px',
                                        height: '7px',
                                        backgroundColor: '#D91656',
                                    }}/>

                        </Box>

                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                                height: '350px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                                <Typography 
                                    color="info"
                                    sx={{
                                        textAlign: 'center',
                                        fontFamily: 'Poppins-Bold',
                                        marginTop: '50px',
                                }}>
                                    Rodolfo N. Pelaez Blvd,. <br/>
                                    Carmen, Cagayan de Oro City 9000  <br/>
                                    Cagayan de Oro, Philippines  <br/>
                                </Typography>

                                <Box sx={{
                                        width: '100px',
                                        height: '7px',
                                        backgroundColor: '#D91656',
                                        marginTop: '20px',
                                    }}/>
                                
                        </Box>

                        {/* Operation Hours Section*/}
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#ffffff',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                                <ScheduleIcon sx={{
                                                    width: '50px',
                                                    height: '50px',
                                                }} color="primary" />

                                <Typography
                                    sx={{
                                        fontFamily: 'Poppins-SemiBold',
                                        textAlign: 'center',
                                        fontSize: '35px',
                                        marginBottom: '10px',
                                        color: '#45283C',
                                }}>
                                    Spin Time <br/> Schedule
                                </Typography>

                                <Box sx={{
                                        width: '100px',
                                        height: '7px',
                                        backgroundColor: '#D91656',
                                    }}/>
                                
                        </Box>

                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#D91656',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                                <Typography 
                                    color="info"
                                    sx={{
                                        textAlign: 'center',
                                        fontFamily: 'Poppins-Bold',
                                        paddingRight: '150px',
                                        paddingLeft: '150px',
                                }}>
                                    Monday to Thursday: 8:00 AM - 8:00 PM <br/>
                                    Friday: 8:00 AM - 10:00 PM <br/>
                                    Saturday: 9:00 AM - 10:00 PM <br/>
                                    Sunday: 10:00 AM - 6:00 PM 3.2. <br/><br/>

                                    Special Hours: We are open on public holidays 
                                    from 10:00 AM to 4:00 PM and closed on Christmas Day and New Year's Day.
                                </Typography>

                                <Box sx={{
                                        width: '100px',
                                        height: '7px',
                                        backgroundColor: '#45283C',
                                        marginTop: '20px',
                                    }}/>

                        </Box>

                    </Box>

                        {/* Selling Points Section*/}
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                    { width: '100%',},
                            }}>

                                <SellIcon sx={{
                                              width: '50px',
                                              height: '50px',
                                              marginBottom: '10px',
                                        }} color="primary" />

                                <Typography
                                    color="info"
                                    sx={{
                                        fontFamily: 'Poppins-SemiBold',
                                        textAlign: 'center',
                                        fontSize: '35px',
                                        marginBottom: '10px',
                                }}>
                                    Unique Selling <br/> Points
                                </Typography>

                                <Box sx={{
                                        width: '100px',
                                        height: '7px',
                                        backgroundColor: '#D91656',
                                    }}/>

                        </Box>

                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                                <Typography 
                                    color="info"
                                    sx={{
                                        textAlign: 'center',
                                        fontFamily: 'Poppins-Bold',
                                        paddingRight: '150px',
                                        paddingLeft: '150px',
                                }}>
                                    <Typography sx={{
                                                    fontFamily: 'Poppins-Bold',
                                                    color: '#D91656',
                                                    fontSize: '20px',
                                    }}>
                                        Eco-Friendly Products:
                                    </Typography>
                                    
                                    "We use biodegradable detergents and softeners for a safer, greener clean." <br/><br/>

                                    <Typography sx={{
                                                    fontFamily: 'Poppins-Bold',
                                                    color: '#D91656',
                                                    fontSize: '20px',
                                    }}>
                                        Premium Care for Delicates:
                                    </Typography>

                                    "Specialized handling for fabrics like silk, lace, and wool to ensure longevity."<br/><br/>

                                    <Typography sx={{
                                                    fontFamily: 'Poppins-Bold',
                                                    color: '#D91656',
                                                    fontSize: '20px',
                                    }}>
                                        Satisfaction Guarantee: 
                                    </Typography>

                                    "Not happy with the results? We'll rewash it for free!" <br/>
                                </Typography>

                                <Box sx={{
                                        width: '100px',
                                        height: '7px',
                                        backgroundColor: '#D91656',
                                        marginTop: '20px',
                                    }}/>
                                
                        </Box>

                        {/* Staff Section*/}
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#ffffff',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                                <GroupsIcon sx={{
                                              width: '50px',
                                              height: '50px',
                                              marginBottom: '10px',
                                        }} color="primary" />

                                <Typography
                                    color="#45283C"
                                    sx={{
                                        fontFamily: 'Poppins-SemiBold',
                                        textAlign: 'center',
                                        fontSize: '35px',
                                        marginBottom: '10px',
                                }}>
                                    Laundry <br/> Legends
                                </Typography>

                                <Box sx={{
                                        width: '100px',
                                        height: '7px',
                                        backgroundColor: '#D91656',
                                    }}/>
                                
                        </Box>

                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#D91656',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                                overflow: 'auto',
                            }}>

                                <Typography sx={{
                                                fontFamily: 'Poppins-Bold',
                                                fontSize: '25px',
                                                textAlign: 'center',
                                                padding: '30px',
                                                
                                    }}color="info" >

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        Owner/CEO:
                                    </Typography>
                                    Chen Pschyneth Cabiluna <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        General Manager:
                                    </Typography>
                                    Philip Elbambo <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        Front Desk Attendant:
                                    </Typography>
                                    Rj Belleza <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        Maintenance Technician: 
                                    </Typography>
                                    Kenneth Padua <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        Dryer Operator:  
                                    </Typography>
                                    Clifford Madulin <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        Washer/Sorter: 
                                    </Typography>
                                    Oliver Obut <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        Ironing Specialist/Presser: 
                                    </Typography>
                                    Stephen Mercado <br/>
                                    
                                </Typography>

                        </Box>

                        {/* Terms and Conditions Section*/}
                    <Box sx={{
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center',
                             justifyContent: 'center',
                             width: '50%',
                             height: '400px',
                             backgroundColor: '#45283C',
                             '@media (max-width: 700px)': 
                               { width: '100%',},
                            }}>

                                <RuleIcon sx={{
                                              width: '50px',
                                              height: '50px',
                                              marginBottom: '10px',
                                        }} color="primary" />

                                <Typography
                                    color="info"
                                    sx={{
                                        fontFamily: 'Poppins-SemiBold',
                                        textAlign: 'center',
                                        fontSize: '35px',
                                        marginBottom: '10px',
                                }}>
                                    Terms and <br/> Conditions
                                </Typography>

                                <Box sx={{
                                        width: '100px',
                                        height: '7px',
                                        backgroundColor: '#D91656',
                                    }}/>

                        </Box>

                        <Box sx={{
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                                overflow: 'auto',
                                borderTop: '40px solid #45283C',
                                borderBottom: '40px solid #45283C',
                            }}>

                                <Typography sx={{
                                                fontFamily: 'Poppins-Regular',
                                                fontSize: '13px',
                                                padding: '30px',
                                }} color="info">

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        Terms and Conditions 
                                    </Typography> 
                                    Effective Date: December 25, 2030 <br/><br/>
                                    Welcome to Convenient Laundry! By using our services, you agree to the following terms and conditions. Please read them carefully. <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        1. Service Agreement 
                                    </Typography> 
                                    1.1 Convenient Laundry provides washing, drying, ironing, and delivery services.
                                    1.2 By placing an order, you confirm the details provided are accurate and agree to these terms. <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        2. Pickup and Delivery
                                    </Typography> 
                                    2.1 Pickup and delivery services are available within Cagayan de Oro City. <br/>
                                    2.2 Customers must ensure clothes are ready for pickup at the agreed time and location.<br/>
                                    2.3 Delivery times are approximate, and we are not liable for delays caused by unforeseen circumstances. <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        3. Garment Care
                                    </Typography> 
                                    3.1 We follow care instructions on clothing labels. If no label is present, we will proceed based on standard practices and are not liable for any damage. <br/>
                                    3.2 While we strive for quality, we are not responsible for:
                                    <ul>
                                        <li>Pre-existing damage (e.g., loose threads, weak fabric). </li>
                                        <li>Items left in pockets or garments (e.g., pens, money, jewelry). </li>
                                    </ul><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        4. Loss or Damage
                                    </Typography> 
                                    4.1 In case of loss or damage, compensation will not exceed 10 times the service cost for the specific garment. <br/>
                                    4.2 Claims must be made within 24 hours of delivery. <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        5. Payment Terms
                                    </Typography> 
                                    5.1 Payment is due upon delivery unless otherwise agreed. <br/>
                                    5.2 Accepted payment methods include cash, credit/debit cards, or digital wallets. <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        6. Customer Responsibility
                                    </Typography> 
                                    6.1 Customers must inform us of any special care instructions for delicate fabrics. <br/>
                                    6.2 Convenient Laundry is not liable for damage resulting from failure to disclose special care needs.<br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        7. Refunds and Cancellations
                                    </Typography> 
                                    7.1 Orders can be canceled or rescheduled up to 2 hours before the pickup time. <br/>
                                    7.2 Refunds are issued only for services not rendered due to our fault. <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        8. Privacy Policy
                                    </Typography> 
                                    8.1 Personal information (e.g., address, contact details) is used solely to provide services and will not be shared without consent. <br/><br/>

                                    <Typography sx={{fontFamily: 'Poppins-Bold'}} color="success">
                                        9. Amendments
                                    </Typography> 
                                    9.1 Convenient Laundry reserves the right to modify these terms at any time. Updates will be posted on our website <u>www.convenientlaundryservices.com.</u>

                                </Typography>
                                
                        </Box>

                        <Box sx={{width: '100%', height: '90px', backgroundColor: '#D91656',}}></Box>

            </Box>
        </ThemeProvider>
    );
}

export default AboutUs;
