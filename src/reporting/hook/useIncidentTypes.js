import { useEffect, useState } from "react";
import { offlineService } from "../../services/offlineService";
import axios from "axios";

export const useIncidentTypes = () => {

    const [incidentTypes, setIncidentTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchIncidentTypes = async () => {

        try {
            setLoading(true);

            if (offlineService.isOnline()) {
                const response = await axios.get("http://localhost:8081/api/report/incidentType");
                const types = response.data;

                await offlineService.cacheIncidentTypes(types);
                setIncidentTypes(types);

            } else {
                const cachedTypes = await offlineService.getCachedIncidentTypes();
                if (cachedTypes.length > 0) {
                    setIncidentTypes(cachedTypes);
                } else {
                    throw new Error('No cashed incident types available');
                }
            }
        } catch (err) {
            console.error('Error fetching incident types:', err);
            setError(err.message);

            try {
                const cachedTypes = await offlineService.getCachedIncidentTypes();
                if (cachedTypes.length > 0) {
                    setIncidentTypes(cachedTypes);
                    setError(null);
                }
            } catch (cacheError) {
                console.error('No cached data available:', cacheError);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncidentTypes();
    }, []);

    const refetch = () => {
        fetchIncidentTypes();
    }

    return { incidentTypes, loading, error, refetch };
};