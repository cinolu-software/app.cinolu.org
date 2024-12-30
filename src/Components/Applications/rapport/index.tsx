import React, {useEffect} from 'react';
import {Container, Card} from "reactstrap";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {Document, Page, View, StyleSheet, PDFViewer, Image, Text} from '@react-pdf/renderer';
import {ImagePath} from "@/Constant";
import {fetchCategory} from "@/Redux/Reducers/programsSlice/ProgramsCategory";
import {fetchProgramsType} from "@/Redux/Reducers/programsSlice/programsTypeSlice";
import {fetchPrograms} from "@/Redux/Reducers/programsSlice/programsSlice";

const styles = StyleSheet.create({
    viewer: {
        width: '100%',
        height: '90vh',
    },
    container : {
      marginLeft: 30,
    },
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft:30
    },
    headerTextItem: {
        fontSize: 10,
        marginBottom: 2,
        marginLeft:35
    },
    imageLogo: {
        width: 50,
        height: 50,
    },

    mainTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textTransform: 'uppercase',
    },
    programTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 15,
        textTransform: 'capitalize',
        textDecoration: 'underline'
    },
    programItem: {
        marginLeft: 20,
        marginTop: 10,
    },
});

const MyDocument = ({programsData} : {programsData: any}) => (

    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image src={`${ImagePath}/logo/logo-g.png`} style={styles.imageLogo} />
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>Centre d’Innovation de Lubumbashi</Text>
                        <Text style={styles.headerTextItem}>Avenue des Usines, Makomeno</Text>
                        <Text style={styles.headerTextItem}>221 Lubumbashi, Haut-Katanga RDC</Text>
                        <Text style={styles.headerTextItem}>Site web: www.cinolu.org</Text>
                        <Text style={styles.headerTextItem}>E-mail: compta@cinolu.org</Text>
                        <Text style={styles.headerTextItem}>Tel: +243 993 320 803</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.mainTitle}>Rapport Annuel</Text>

                </View>
                <View>
                    <Text style={styles.programTitle}>Programmes</Text>
                    <View style={styles.programItem}>
                        <Text style={styles.programItem}>- Nombre Total de Programs : </Text>
                        <Text style={styles.programItem}>- Types de Programs : </Text>
                        <Text style={styles.programItem}>- Cathégorie de Programs : </Text>
                        <Text style={styles.programItem}>- Nombre de Bénéficiares : </Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.programTitle}>Programmes Par Type</Text>
                    <View style={styles.programItem}>

                    </View>
                </View>

                <View>
                    <Text style={styles.programTitle}>Programmes Par Cathégorie</Text>
                    <View style={styles.programItem}>

                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

const Rapport = () => {

    const { originalProgramsData , status} = useAppSelector(state => state.programs);
    const {programsCategoryData} = useAppSelector(state=>state.programCategory);
    const statusCategory = useAppSelector(state=>state.programCategory.status);
    const statusType = useAppSelector(state=>state.programsType.status);
    const {originalTypeProgramsData,} = useAppSelector(state=>state.programsType);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(statusType === "idle" || statusType === "loading"){
            dispatch(fetchCategory());
        }
    }, [statusType, dispatch]);

    useEffect(() => {
        if(statusCategory === "idle" || statusCategory === "loading"){
            dispatch(fetchCategory());
        }
    }, [statusCategory, dispatch]);

    useEffect(() => {
        if (status === "idle" || status === "loading") {
            dispatch(fetchPrograms());
        }
    }, [status, dispatch]);




    return(
        <Container fluid>
            <Card>
                <PDFViewer style={styles.viewer}>
                    <MyDocument programsData={originalProgramsData} />
                </PDFViewer>
            </Card>
        </Container>
    )
}

export default Rapport;