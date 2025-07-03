
-- Create function to handle successful payment
CREATE OR REPLACE FUNCTION handle_successful_payment()
RETURNS TRIGGER AS $$
DECLARE
    invitation_id TEXT;
BEGIN
    -- Check if status changed from non-success to success
    IF OLD.status != 'success' AND NEW.status = 'success' THEN
        -- Generate UUID for invitation
        invitation_id := gen_random_uuid()::TEXT;
        
        -- Insert into Invitation table
        INSERT INTO "Invitation" (id, "orderId", slug, "publicUrl", "customUrl")
        VALUES (
            invitation_id,
            NEW.order_id,
            NULL,
            NULL,
            NULL
        );
        
        -- Insert into InvitationContent table with default content
        INSERT INTO "InvitationContent" (id, "invitationId", mode, content)
        VALUES (
            gen_random_uuid()::TEXT,
            invitation_id,
            NULL,
            '{
                "base_data": {
                    "brideName": "Peggy Carter",
                    "groomName": "Steve Rogers",
                    "brideFather": "Edwin Jarvis",
                    "groomFather": "James Rogers",
                    "brideMother": "Margaret Carter",
                    "groomMother": "Sarah Rogers",
                    "weddingDate": "2023-10-15",
                    "weddingTime": "10:00",
                    "weddingVenue": "Stark Tower, New York",
                    "weddingAddress": "123 Avengers Way, New York, NY 10001",
                    "weddingMapLink": "https://goo.gl/maps/AvengersTower"
                },
                "sections": [
                    {
                        "section_id": "cover",
                        "type": "single",
                        "content": {
                            "subtitle": "The Wedding of",
                            "title": "Steve & Peggy",
                            "to": "Kepada Bapak/Ibu/Saudara/i"
                        }
                    },
                    {
                        "section_id": "hero",
                        "type": "single",
                        "content": {
                            "subtitle": "The Wedding of",
                            "title": "Steve & Peggy",
                            "to": "Kepada Bapak/Ibu/Saudara/i"
                        }
                    },
                    {
                        "section_id": "sekapursirih",
                        "type": "single",
                        "content": {
                            "title": "Kata Pengantar",
                            "ayat": "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi orang-orang yang berpikir.",
                            "source": "Q.S. Ar-Rum (30:21)"
                        }
                    },
                    {
                        "section_id": "undangan",
                        "type": "single",
                        "content": {
                            "title": "Undangan Pernikahan",
                            "subtitle": "Kami bermaksud mengundang Anda untuk merayakan hari bahagia kami"
                        }
                    },
                    {
                        "section_id": "story",
                        "type": "multiple",
                        "content": {
                            "title": "Our Journey"
                        }
                    },
                    {
                        "section_id": "schedules",
                        "type": "multiple",
                        "content": {
                            "title": "Galeri Foto",
                            "subtitle": "Kenangan Indah Bersama"
                        }
                    },
                    {
                        "section_id": "gallery",
                        "type": "multiple",
                        "content": {
                            "title": "Galeri",
                            "prewed_link": "https://www.youtube.com/embed/pyLDM9NeRnQ?si=jRjdDmOMDCx9AGjW"
                        }
                    },
                    {
                        "section_id": "wish",
                        "type": "multiple",
                        "content": {
                            "title": "Wedding Wish",
                            "subtitle": "Doa dan ucapan dari Bapak/Ibu/Saudara/i sangat berarti bagi kami"
                        }
                    },
                    {
                        "section_id": "gift",
                        "type": "multiple",
                        "content": {
                            "title": "Wedding Gift"
                        }
                    },
                    {
                        "section_id": "closing",
                        "type": "single",
                        "content": {
                            "subtitle": "The Wedding of",
                            "title": "Steve & Peggy",
                            "desc": "Menjadi sebuah kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i dapat hadir dan memberikan doa restu pada hari bahagia kami. Terima kasih atas perhatian dan kehadirannya."
                        }
                    }
                ]
            }'::jsonb
        );
        
        RAISE NOTICE 'Created invitation and content for order_id: %', NEW.order_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on midtrans_transactions table
CREATE OR REPLACE TRIGGER trigger_successful_payment
    AFTER UPDATE ON midtrans_transactions
    FOR EACH ROW
    EXECUTE FUNCTION handle_successful_payment();
