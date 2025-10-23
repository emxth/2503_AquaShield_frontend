// src/hooks/useIncidentTypes.js
import { useEffect, useState } from "react";

import axios from "axios";
import { offlineService } from "../../services/offlineService";

export const useIncidentTypes = () => {
    const [incidentTypes, setIncidentTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchIncidentTypes = async () => {
        try {
            setLoading(true);
            console.log("🔄 Fetching incident types...");

            if (offlineService.isOnline()) {
                console.log("🌐 Online - fetching from API");
                const response = await axios.get("http://localhost:8081/api/report/incidentType");
                console.log("📦 Full API Response:", response);
                console.log("📊 Response data:", response.data);

                // Handle the API response format: { success: true, data: ["string1", "string2", ...] }
                let types = [];

                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    // Convert string array to object array with id and name
                    types = response.data.data.map((type, index) => ({
                        id: index + 1,
                        name: type
                    }));
                } else if (Array.isArray(response.data)) {
                    // If it's directly an array of strings
                    types = response.data.map((type, index) => ({
                        id: index + 1,
                        name: type
                    }));
                } else {
                    // Fallback to default types
                    console.warn("⚠️ Unknown API response structure, using fallback");
                    types = getFallbackIncidentTypes();
                }

                console.log("✅ Processed types:", types);

                await offlineService.cacheIncidentTypes(types);
                setIncidentTypes(types);

            } else {
                console.log("📴 Offline - using cached data");
                const cachedTypes = await offlineService.getCachedIncidentTypes();
                console.log("💾 Cached types:", cachedTypes);

                if (cachedTypes && Array.isArray(cachedTypes) && cachedTypes.length > 0) {
                    setIncidentTypes(cachedTypes);
                } else {
                    throw new Error('No cached incident types available');
                }
            }
        } catch (err) {
            console.error('❌ Error fetching incident types:', err);
            setError(err.message);

            // Use fallback data
            const fallbackTypes = getFallbackIncidentTypes();
            setIncidentTypes(fallbackTypes);
            console.log("🔄 Using fallback incident types");
        } finally {
            setLoading(false);
            console.log("🏁 Loading complete");
        }
    };

    // Fallback incident types
    const getFallbackIncidentTypes = () => {
        return [
            { id: 1, name: "Fishing without license" },
            { id: 2, name: "Fishing in restricted area" },
            { id: 3, name: "Using explosives" },
            { id: 4, name: "Using cyanide" },
            { id: 5, name: "Using banned nets" },
            { id: 6, name: "Catching undersized fish" },
            { id: 7, name: "Exceeding quota" },
            { id: 8, name: "Targeting endangered species" },
            { id: 9, name: "Illegal fish trade" },
            { id: 10, name: "Foreign vessel intrusion" }
        ];
    };

    useEffect(() => {
        fetchIncidentTypes();
    }, []);

    const refetch = () => {
        fetchIncidentTypes();
    }

    return { incidentTypes, loading, error, refetch };
};